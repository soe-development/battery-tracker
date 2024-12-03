import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { BatteryReplacementService } from './battery-replacement.service';
import { ReceiptService } from '../receipt/receipt.service';
import { AuthGuard } from 'src/modules/auth/auth.middleware';

@Controller('battery-replacement')
@UseGuards(AuthGuard)
export class BatteryReplacementController {
  constructor(
    private readonly batteryReplacementService: BatteryReplacementService,
    private readonly receiptService: ReceiptService,
  ) {}

  @Post('find')
  async get(@Req() request: any, @Res() response: any) {
    try {
      const { id } = request.body;
      const data = await this.batteryReplacementService.findById(id);

      response.status(200).json({
        data: data,
        status: 200,
        message: 'Successful find',
      });
    } catch (error) {
      response.status(401).json({ status: 401, message: 'Not authorized' });
    }
  }

  @Get('findCreateData')
  async getCreateData(@Req() request: any, @Res() response: any) {
    try {
      const receipt = await this.receiptService.find();

      const data = [
        {
          name: 'receiving-batteries',
          value: receipt.map((element: any) => {
            return {
              id: element.id,
              name:
                element.typeBattery +
                ' | ' +
                element.counterparty +
                ' | ' +
                element.contractNumber,
            };
          }),
        },
      ];

      response.status(200).json({
        data: data,
        status: 200,
        message: 'Successful find',
      });
    } catch (error) {
      response.status(401).json({ status: 401, message: 'Not authorized' });
    }
  }

  @Post('create')
  async create(@Req() request: any, @Res() response: any) {
    try {
      const { data } = request.body;

      const receipt = await this.receiptService.findById(data[1].id);

      const result = await this.batteryReplacementService.create({
        equipmentCardId: data[3].id,
        typeBattery: receipt.typeBattery,
        numberOfBatteries: data[2].value,
        createDate: data[0].value,
        receiptId: data[1].id,
      });

      if (result) {
        response
          .status(201)
          .json({ status: 201, result: 'Created successful' });
      } else {
        response.status(501).json({ status: 501, result: 'Created failed' });
      }
    } catch (error) {
      response.status(401).json({ status: 401, message: 'Not authorized' });
    }
  }

  @Post('update')
  async update(@Req() request: any, @Res() response: any) {
    try {
      const { data } = request.body;

      const result = this.batteryReplacementService.update(data);

      if (result) {
        response
          .status(201)
          .json({ status: 201, result: 'Updated successful' });
      } else {
        response.status(501).json({ status: 501, result: 'Updated failed' });
      }
    } catch (error) {
      response.status(401).json({ status: 401, message: 'Not authorized' });
    }
  }

  @Post('delete')
  async delete(@Req() request: any, @Res() response: any) {
    try {
      const { id } = request.body;
      const result = await this.batteryReplacementService.delete(id);

      if (result) {
        response
          .status(201)
          .json({ status: 201, result: 'Deleted successful' });
      } else {
        response.status(201).json({ status: 501, result: 'Deleted failed' });
      }
    } catch (error) {
      response.status(501).json({ status: 501, result: 'Deleted failed' });
    }
  }
}

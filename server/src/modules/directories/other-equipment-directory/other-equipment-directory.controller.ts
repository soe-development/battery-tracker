import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OtherEquipmentDirectoryService } from './other-equipment-directory.service';
import { BatteriesDirectoryService } from '../batteries-directory/batteries-directory.service';

@Controller('other-equipment-directory')
export class OtherEquipmentDirectoryController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly otherEquipmentDirectoryService: OtherEquipmentDirectoryService,
    private readonly batteriesDirectoryService: BatteriesDirectoryService,
  ) {}

  @Post('create')
  async create(@Req() request: any, @Res() response: any) {
    try {
      const { data } = request.body;

      const result = await this.otherEquipmentDirectoryService.create({
        producer: data[0].value,
        model: data[1].value,
        numberOfBatteries: data[3].value,
        dateOfLastBatteryReplacement: data[4].value,
        batteriesDirectoryId: data[2].id,
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

  @Get('find')
  async get(@Req() request: any, @Res() response: any) {
    try {
      // const { token } = request.body;
      // const dataToken = await this.jwtService.verifyAsync(token);
      // if (!dataToken) {
      //   response.status(401).json({ status: 401, result: 'Not authorized' });
      // } else {
      const data = await this.otherEquipmentDirectoryService.find();

      response.status(200).json({
        data: data,
        status: 200,
        message: 'Successful find',
      });
      // }
    } catch (error) {
      response.status(401).json({ status: 401, message: 'Not authorized' });
    }
  }

  @Get('findCreateData')
  async getCreateData(@Req() request: any, @Res() response: any) {
    try {
      // const { token } = request.body;
      // const dataToken = await this.jwtService.verifyAsync(token);
      // if (!dataToken) {
      //   response.status(401).json({ status: 401, result: 'Not authorize' });
      // } else {

      const batteriesDirectory = await this.batteriesDirectoryService.find();

      const data = [
        {
          name: 'batteries-directory',
          value: batteriesDirectory.map((element: any) => {
            return { id: element.id, name: element.typeBattery };
          }),
        },
      ];

      response.status(200).json({
        data: data,
        status: 200,
        message: 'Successful find',
      });
      //}
    } catch (error) {
      response.status(401).json({ status: 401, message: 'Not authorized' });
    }
  }

  @Post('findTypesBattery')
  async getByType(@Req() request: any, @Res() response: any) {
    try {
      const { token } = request.body;
      const dataToken = await this.jwtService.verifyAsync(token);
      if (!dataToken) {
        response.status(401).json({ status: 401, result: 'Not authorized' });
      } else {
        const findData =
          await this.otherEquipmentDirectoryService.findTypesBattery();

        response.status(200).json({
          findData: findData,
          status: 200,
          message: 'Successful find',
        });
      }
    } catch (error) {
      response.status(401).json({ status: 401, message: 'Not authorized' });
    }
  }

  @Post('update')
  async update(@Req() request: any, @Res() response: any) {
    try {
      const { data } = request.body;

      const result = this.otherEquipmentDirectoryService.update(data);

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
      const result = this.otherEquipmentDirectoryService.delete(id);

      if (result) {
        response
          .status(201)
          .json({ status: 201, result: 'Deleted successful' });
      } else {
        response.status(501).json({ status: 501, result: 'Deleted failed' });
      }
    } catch (error) {
      response.status(401).json({ status: 401, message: 'Not authorized' });
    }
  }
}

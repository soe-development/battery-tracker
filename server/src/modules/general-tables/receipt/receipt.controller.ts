import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ReceiptService } from './receipt.service';
import { BatteriesDirectoryService } from 'src/modules/directories/batteries-directory/batteries-directory.service';
import { BudgetApiService } from 'src/modules/budget-api/budget-api.service';
import { AuthGuard } from 'src/modules/auth/auth.middleware';

@Controller('receiving-batteries')
@UseGuards(AuthGuard)
export class ReceiptController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly receiptService: ReceiptService,
    private readonly batteriesDirectoryService: BatteriesDirectoryService,
    private readonly budgetApiService: BudgetApiService,
  ) {}

  @Post('create')
  async create(@Req() request: any, @Res() response: any) {
    try {
      const { data } = request.body;

      const contractsDirectory = await this.budgetApiService.getContractsById(
        data[5].id,
      );

      const result = await this.receiptService.create({
        dateOfReceiving: data[0].value,
        batteriesDirectoryId: data[1].id,
        numbers: data[2].value,
        currentBalance: data[3].value,
        counterparty: data[4].value,
        contractNumber: data[5].value,
        contractDate: contractsDirectory.date,
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
      const data = await this.receiptService.find();

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
      const batteriesDirectory = await this.batteriesDirectoryService.find();
      const counterpartiesDirectory =
        await this.budgetApiService.getCounterparties();
      const contractsDirectory = await this.budgetApiService.getContracts();

      const data = [
        {
          name: 'batteries-directory',
          value: batteriesDirectory.map((element: any) => {
            return { id: element.id, name: element.typeBattery };
          }),
        },
        {
          name: 'counterparties-directory',
          value: counterpartiesDirectory.map((element: any) => {
            return { id: element.id, name: element.name };
          }),
        },
        {
          name: 'contracts-directory',
          value: contractsDirectory.map((element: any) => {
            return {
              id: element.contractId,
              name: element.contractNumber,
              counterpartiesDirectoryId: element.counterpartyId,
            };
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

  @Post('findCost')
  async getCost(@Req() request: any, @Res() response: any) {
    try {
      const { token } = request.body;
      const dataToken = await this.jwtService.verifyAsync(token);
      if (!dataToken) {
        response.status(401).json({ status: 401, result: 'Not authorized' });
      } else {
        const { batteriesDirectoryId } = request.body;
        const findData = await this.receiptService.findCost(
          batteriesDirectoryId,
        );

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

  @Post('delete')
  async delete(@Req() request: any, @Res() response: any) {
    try {
      const { token } = request.body;
      const dataToken = await this.jwtService.verifyAsync(token);

      if (!dataToken) {
        response.status(401).json({ status: 401, result: 'Not authorized' });
      } else {
        const data = request.body;
        this.receiptService.delete(data);

        response.status(200).json({
          status: 200,
          message: 'Successful delete',
        });
      }
    } catch (error) {
      response.status(401).json({ status: 401, message: 'Not authorized' });
    }
  }
}

import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EquipmentCardService } from './equipment-card.service';
import { UPSModelsDirectoryService } from 'src/modules/directories/ups-models-directory/ups-models-directory.service';
import { AuthGuard } from 'src/modules/auth/auth.middleware';

@Controller('equipment-card')
@UseGuards(AuthGuard)
export class EquipmentCardController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly equipmentCardService: EquipmentCardService,
    private readonly upsModelsDirectoryService: UPSModelsDirectoryService,
  ) {}

  @Post('create')
  async create(@Req() request: any, @Res() response: any) {
    try {
      const { data } = request.body;

      const result = await this.equipmentCardService.create({
        upsModelsDirectoryId: data[0].id,
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
  async getCommonData(@Req() request: any, @Res() response: any) {
    try {
      const data = await this.equipmentCardService.findCommonData();

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
      const upsModelsDirectory = await this.upsModelsDirectoryService.find();

      const data = [
        {
          name: 'ups-models-directory',
          value: upsModelsDirectory.map((element: any) => {
            return {
              id: element.upsModelsDirectoryid,
              name:
                element.producer +
                ' | ' +
                element.model +
                ' | ' +
                element.typeBattery +
                ' | ' +
                element.inventoryNumber +
                ' | ' +
                element.s_n,
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

  @Post('findBatteryReplacement')
  async getBatteryReplacement(@Req() request: any, @Res() response: any) {
    try {
      const { upsModelsDirectoryId } = request.body;
      const findData = await this.equipmentCardService.findBatteryReplacement(
        upsModelsDirectoryId,
      );

      response.status(200).json({
        findData: findData,
        status: 200,
        message: 'Successful find',
      });
    } catch (error) {
      response.status(401).json({ status: 401, message: 'Not authorized' });
    }
  }

  @Get('writeOff/find')
  async getWriteOff(@Res() response: any) {
    response.status(200).json({
      data: [
        { id: 1, writtenOff: 'Дійсне' },
        { id: 2, writtenOff: 'Списано' },
      ],
      status: 200,
      message: 'Successful find',
    });
  }

  @Post('update')
  async update(@Req() request: any, @Res() response: any) {
    try {
      const { data } = request.body;

      const result = this.equipmentCardService.update(data);

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
      const result = await this.equipmentCardService.delete(id);

      if (result) {
        response
          .status(201)
          .json({ status: 201, result: 'Deleted successful' });
      } else {
        response.status(201).json({ status: 501, result: 'Deleted failed' });
      }
    } catch (error) {
      response.status(401).json({ status: 401, message: 'Not authorized' });
    }
  }
}

import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EquipmentCardService } from './equipment-card.service';
import { InjectRepository } from '@nestjs/typeorm';
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
      const { token } = request.body;
      const dataToken = await this.jwtService.verifyAsync(token);
      if (!dataToken) {
        response.status(401).json({ status: 401, result: 'Not authorized' });
      } else {
        const { upsModelsDirectoryId } = request.body;
        const findData = await this.equipmentCardService.findBatteryReplacement(
          upsModelsDirectoryId,
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
        this.equipmentCardService.delete(data);

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

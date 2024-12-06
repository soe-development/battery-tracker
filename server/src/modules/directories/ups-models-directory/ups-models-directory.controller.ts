import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UPSModelsDirectoryService } from './ups-models-directory.service';
import { OtherEquipmentDirectoryService } from '../other-equipment-directory/other-equipment-directory.service';
import { ObjectsDirectoryService } from '../objects-directory/objects-directory.service';
import { AuthGuard } from 'src/modules/auth/auth.middleware';

@Controller('ups-models-directory')
@UseGuards(AuthGuard)
export class UPSModelsDirectoryController {
  constructor(
    private readonly otherEquipmentDirectoryService: OtherEquipmentDirectoryService,
    private readonly upsModelsDirectoryService: UPSModelsDirectoryService,
    private readonly objectsDirectoryService: ObjectsDirectoryService,
  ) {}

  @Post('create')
  async create(@Req() request: any, @Res() response: any) {
    try {
      const { data } = request.body;

      const result = await this.upsModelsDirectoryService.create({
        power: data[0].value,
        yearProductionUPS: data[3].value,
        inventoryNumber: data[1].value,
        s_n: data[2].value,
        apcs: data[5].value,
        dateOfLastBatteryReplacement: data[4].value,
        otherEquipmentDirectoryId: data[6].id,
        objectsDirectoryId: data[7].id,
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
      const data = await this.upsModelsDirectoryService.find();

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
      const otherEquipmentDirectory =
        await this.otherEquipmentDirectoryService.find();

      const objectsDirectory = await this.objectsDirectoryService.find();

      const data = [
        {
          name: 'other-equipment-directory',
          value: otherEquipmentDirectory.map((element: any) => {
            return {
              id: element.id,
              name:
                element.producer +
                ' | ' +
                element.model +
                ' | ' +
                element.typeBattery,
            };
          }),
        },
        {
          name: 'ups-models-directory',
          value: [
            { id: 1, name: 'Так' },
            { id: 2, name: 'Ні' },
          ],
        },
        {
          name: 'objects-directory',
          value: objectsDirectory.map((element: any) => {
            return {
              id: element.id,
              name: element.objectsDirectoryName,
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

  @Post('update')
  async update(@Req() request: any, @Res() response: any) {
    try {
      const { data } = request.body;

      const result = this.upsModelsDirectoryService.update(data);

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
      const result = await this.upsModelsDirectoryService.delete(id);

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

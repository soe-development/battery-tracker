import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ObjectsDirectoryService } from './objects-directory.service';
import { DistrictsDirectoryService } from '../districts-directory/districts-directory.service';
import { BranchesDirectoryService } from '../branches-directory/branches-directory.service';
import { AuthGuard } from 'src/modules/auth/auth.middleware';

@Controller('objects-directory')
@UseGuards(AuthGuard)
export class ObjectsDirectoryController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly brachesDirectoryService: BranchesDirectoryService,
    private readonly districtsDirectoryService: DistrictsDirectoryService,
    private readonly objectsDirectoryService: ObjectsDirectoryService,
  ) {}

  @Post('create')
  async create(@Req() request: any, @Res() response: any) {
    try {
      const { data } = request.body;
      const result = await this.objectsDirectoryService.create({
        name: data[2].value,
        voltage: data[3].value,
        districtsDirectoryId: data[1].id,
      });

      if (result) {
        response
          .status(201)
          .json({ status: 201, result: 'Created successful' });
      } else {
        response.status(501).json({ status: 501, result: 'Created failed' });
      }
    } catch (error) {
      response.status(401).json({ status: 401, result: 'Not authorized' });
    }
  }

  @Get('find')
  async get(@Req() request: any, @Res() response: any) {
    try {
      const data = await this.objectsDirectoryService.find();
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
      const branches = await this.brachesDirectoryService.find();

      const districtsDirectory =
        await this.districtsDirectoryService.findCreateData();

      const data = [
        {
          name: 'branches-directory',
          value: branches,
        },
        {
          name: 'districts-directory',
          value: districtsDirectory,
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

      const result = this.objectsDirectoryService.update(data);

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
      const result = this.objectsDirectoryService.delete(id);

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

import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { BatteriesDirectoryService } from './batteries-directory.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from 'src/modules/auth/auth.middleware';

@Controller('batteries-directory')
@UseGuards(AuthGuard)
export class BatteriesDirectoryController {
  constructor(
    private readonly batteriesDirectoryService: BatteriesDirectoryService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('create')
  async create(@Req() request: any, @Res() response: any) {
    try {
      const { data } = request.body;

      const result = await this.batteriesDirectoryService.create({
        typeBattery: data[0].value,
        a_h: data[1].value,
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
  async find(@Req() request: any, @Res() response: any) {
    try {
      const data = await this.batteriesDirectoryService.find();
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
      const batteriesdirectory = await this.batteriesDirectoryService.find();

      const data = [
        {
          name: 'batteries-directory',
          value: batteriesdirectory,
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

      const result = this.batteriesDirectoryService.update(data);

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
      const result = this.batteriesDirectoryService.delete(id);

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

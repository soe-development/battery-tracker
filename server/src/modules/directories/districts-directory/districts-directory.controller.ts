import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DistrictsDirectoryService } from './districts-directory.service';
import { BranchesDirectoryService } from '../branches-directory/branches-directory.service';
import { AuthGuard } from 'src/modules/auth/auth.middleware';

@Controller('districts-directory')
@UseGuards(AuthGuard)
export class DistrictsDirectoryController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly districtsDirectoryService: DistrictsDirectoryService,
    private readonly brachesDirectoryService: BranchesDirectoryService,
  ) {}

  @Post('create')
  async create(@Req() request: any, @Res() response: any) {
    try {
      // const { token } = request.body;
      // const dataToken = await this.jwtService.verifyAsync(token);
      // if (!dataToken) {
      //   response.status(401).json({ status: 401, result: 'Not authorized' });
      // } else {
      const { data } = request.body;
      const result = await this.districtsDirectoryService.create({
        name: data[1].value,
        branchesDirectoryId: data[0].id,
      });

      if (result) {
        response
          .status(201)
          .json({ status: 201, result: 'Created successful' });
      } else {
        response.status(501).json({ status: 501, result: 'Created failed' });
      }
      //}
    } catch (error) {
      console.log(error);
      response.status(401).json({ status: 401, message: 'Not authorized' });
    }
  }

  @Get('find')
  async get(@Req() request: any, @Res() response: any) {
    try {
      // const { token } = request.body;
      // const dataToken = await this.jwtService.verifyAsync(token);
      // if (!dataToken) {
      //   response.status(401).json({ status: 401, result: 'Not authorize' });
      // } else {
      const data = (await this.districtsDirectoryService.find()).map(
        (element: any) => ({ ...element, nameTable: 'branches-directory' }),
      );

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

      const branches = await this.brachesDirectoryService.find();

      const data = [
        {
          name: 'branches-directory',
          value: branches,
        },
      ];

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

  @Post('update')
  async update(@Req() request: any, @Res() response: any) {
    try {
      const { data } = request.body;

      const result = this.districtsDirectoryService.update(data);

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
      const result = await this.districtsDirectoryService.delete(id);

      console.log(result);

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

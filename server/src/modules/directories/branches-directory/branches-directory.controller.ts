import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BranchesDirectoryService } from './branches-directory.service';

@Controller('branches-directory')
export class BranchesDirectoryController {
  constructor(
    private readonly jwtService: JwtService,
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
      const result = await this.brachesDirectoryService.create({
        name: data[0].value,
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
      response.status(401).json({ status: 401, result: 'Not authorized' });
    }
  }

  @Post('find')
  async get(@Req() request: any, @Res() response: any) {
    try {
      const { token } = request.body;
      const dataToken = await this.jwtService.verifyAsync(token);
      if (!dataToken) {
        response.status(401).json({ status: 401, result: 'Not authorized' });
      } else {
        const findData = await this.brachesDirectoryService.find();

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

      const result = this.brachesDirectoryService.update(data);

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
  async post(@Req() request: any, @Res() response: any) {
    try {
      const { id } = request.body;

      const result = await this.brachesDirectoryService.delete(id);

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
}

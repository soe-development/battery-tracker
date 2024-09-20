import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TotalService } from './total.service';

@Controller('total-table')
export class TotalController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly totalService: TotalService,
  ) {}

  @Post('create')
  async create(@Req() request: any, @Res() response: any) {
    try {
      const { token } = request.body;
      const dataToken = await this.jwtService.verifyAsync(token);
      if (!dataToken) {
        response.status(401).json({ status: 401, result: 'Not authorized' });
      } else {
        const { upsModelsDirectoryId, objectsDirectoryId, equipmentСardId } =
          request.body;

        const result = await this.totalService.create({
          upsModelsDirectoryId,
          objectsDirectoryId,
          equipmentСardId,
        });

        if (result) {
          response
            .status(201)
            .json({ status: 201, result: 'Created successful' });
        } else {
          response.status(501).json({ status: 501, result: 'Created failed' });
        }
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
      const data = await this.totalService.find();

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

  @Post('delete')
  async delete(@Req() request: any, @Res() response: any) {
    try {
      const { token } = request.body;
      const dataToken = await this.jwtService.verifyAsync(token);

      if (!dataToken) {
        response.status(401).json({ status: 401, result: 'Not authorized' });
      } else {
        const data = request.body;
        this.totalService.delete(data);

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

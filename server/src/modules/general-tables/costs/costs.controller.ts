import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CostsService } from './costs.service';
import { AuthGuard } from 'src/modules/auth/auth.middleware';

@Controller('expenses-table')
@UseGuards(AuthGuard)
export class CostsController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly costsService: CostsService,
  ) {}

  @Post('create')
  async create(@Req() request: any, @Res() response: any) {
    try {
      const { token } = request.body;
      const dataToken = await this.jwtService.verifyAsync(token);
      if (!dataToken) {
        response.status(401).json({ status: 401, result: 'Not authorized' });
      } else {
        const { upsModelsDirectoryId, objectsDirectoryId } = request.body;

        const result = await this.costsService.create({
          upsModelsDirectoryId: upsModelsDirectoryId,
          objectsDirectoryId: objectsDirectoryId,
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

  @Post('find')
  async get(@Req() request: any, @Res() response: any) {
    try {
      const { id } = request.body;
      const data = await this.costsService.findById(id);

      response.status(200).json({
        data: data,
        status: 200,
        message: 'Successful find',
      });
    } catch (error) {
      response.status(401).json({ status: 401, message: 'Not authorized' });
    }
  }
}

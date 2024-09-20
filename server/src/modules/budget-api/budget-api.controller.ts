import { Controller, Post, Req, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BudgetApiService } from './budget-api.service';

@Controller('budget-api')
export class BudgetApiController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly budgetApiService: BudgetApiService,
  ) {}

  @Post('findContracts')
  async getContracts(@Req() request: any, @Res() response: any) {
    try {
      const { token } = request.body;
      const dataToken = await this.jwtService.verifyAsync(token);
      if (!dataToken) {
        response.status(401).json({ status: 401, result: 'Not authorized' });
      } else {
        const findData = await this.budgetApiService.getContracts();
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
}

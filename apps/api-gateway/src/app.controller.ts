import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guatd';

@Controller()
export class AppController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: any) {
    return req.user;
  }
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  @ApiOperation({
    summary: 'Health Check',
    description: 'Returns the health status of the API Gateway service.',
  })
  healthCheck() {
    return this.appService.healthCheck();
  }
}

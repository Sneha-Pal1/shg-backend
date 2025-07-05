import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
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

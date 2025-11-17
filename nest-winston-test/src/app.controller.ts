import { Controller, Get, Inject, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { WINSTON_LOGGER_TOKEN } from './winston/winston.module';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(WINSTON_LOGGER_TOKEN)
  private logger: Logger;

  @Get()
  getHello(): string {
    this.logger.log('Handling getHello request', AppController.name);
    return this.appService.getHello();
  }
}

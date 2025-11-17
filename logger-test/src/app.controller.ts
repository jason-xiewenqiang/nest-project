import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private logger = new Logger();

  @Get()
  getHello(): string {
    this.logger.debug('a', AppController.name);
    this.logger.error('b', AppController.name);
    this.logger.log('v', AppController.name);
    this.logger.verbose('d', AppController.name);
    this.logger.warn('e', AppController.name);
    return this.appService.getHello();
  }
}

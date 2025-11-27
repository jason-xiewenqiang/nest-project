import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(ConfigService)
  private configService: ConfigService;

  @Get()
  getHello() {
    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      aaa: this.configService.get('aaa'),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      bbb: this.configService.get('bbb'),
    };
  }
}

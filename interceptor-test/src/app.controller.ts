import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { AaaInterceptor } from './aaa.interceptor';
import { MapTestInterceptor } from './map-test.interceptor';
import { TapTestInterceptor } from './tap-test.interceptor';
import { CatchErrorInterceptor } from './catch-error.interceptor';
import { TimeoutInterceptor } from './timeout.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseInterceptors(AaaInterceptor)
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('data')
  @UseInterceptors(MapTestInterceptor)
  getData(): any {
    return { name: 'NestJS', type: 'Framework' };
  }

  @Get('bbb')
  @UseInterceptors(TapTestInterceptor)
  getBbb(): any {
    console.log('Getting BBB data');
    return { id: 1, description: 'This is BBB data' };
  }

  @Get('ccc')
  @UseInterceptors(CatchErrorInterceptor)
  getCcc(): any {
    throw new Error('Error in CCC');
    return '....c';
  }

  @Get('ddd')
  @UseInterceptors(TimeoutInterceptor)
  async getDdd(): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    return '....d';
  }
}

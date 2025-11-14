import {
  Controller,
  Get,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
  // UsePipes,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';

@Controller()
// @UsePipes(ValidatePipe)
@UseInterceptors(TimeInterceptor)
@UseFilters(TestFilter)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('aaa')
  @UseGuards(LoginGuard)
  aaa(): string {
    console.log('AppService aaa');
    return 'AAA';
  }

  // @UseInterceptors(TimeInterceptor)
  @Get('bbb')
  bbb(): string {
    console.log('AppService bbb');
    return 'BBB';
  }

  @Get('ccc')
  @UseFilters(TestFilter)
  ccc(@Query('num', ValidatePipe) num: number): number {
    console.log('AppService ccc');
    return 1 + num;
  }
}

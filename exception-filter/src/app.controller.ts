import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

class AaaDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty({ message: 'aaa 不能为空' })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsEmail({}, { message: 'aaa 不是邮箱格式' })
  aaa: string;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNumber({}, { message: 'bbb 不是数字' })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty({ message: 'bbb 不能为空' })
  bbb: number;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // throw new HttpException('This is a test exception', HttpStatus.BAD_REQUEST);
    throw new BadRequestException('ccccccccccc');
    return this.appService.getHello();
  }

  @Post('aaa')
  aaa(@Body() aaaDto: AaaDto): string {
    console.log(aaaDto);
    return 'aaa';
  }
}

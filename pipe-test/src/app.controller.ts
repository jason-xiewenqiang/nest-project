import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseArrayPipe,
  ParseBoolPipe,
  ParseEnumPipe,
  ParseFloatPipe,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Ooo } from './ooo.dto';

enum Egg {
  AAA = '111',
  BBB = '222',
  CCC = '333',
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(
    @Query(
      'aa',
      ParseIntPipe,
      // new ParseIntPipe({
      //   errorHttpStatusCode: HttpStatus.FOUND,
      // }),
    )
    aa: string,
  ): string {
    return aa + 1;
  }

  @Get('cc')
  ccc(
    @Query('cc', ParseFloatPipe)
    cc: number,
  ): number {
    return cc + 1;
  }

  @Get('dd')
  ddd(
    @Query('dd', ParseBoolPipe)
    dd: boolean,
  ) {
    return typeof dd;
  }

  @Get('ee')
  eee(
    @Query('ee', new ParseArrayPipe({ items: Number }))
    ee: Array<number>,
  ) {
    return ee.reduce((a, b) => a + b, 0);
  }

  @Get('gg/:enum')
  ggg(@Param('enum', new ParseEnumPipe(Egg)) egg: Egg) {
    return egg;
  }

  @Get('ff')
  fff(
    @Query('ff', new ParseArrayPipe({ separator: '..', optional: true }))
    ff: Array<string>,
  ) {
    return ff;
  }

  @Get('aa')
  getHello1(
    @Query(
      'aa',
      new ParseIntPipe({
        // errorHttpStatusCode: HttpStatus.FOUND,
        exceptionFactory: (msg) => {
          console.log(msg);
          return new HttpException(
            'Custom error message: ' + msg,
            HttpStatus.NOT_IMPLEMENTED,
          );
        },
      }),
    )
    aa: string,
  ): string {
    return aa + 10;
  }

  @Post('ooo')
  ooo(@Body(new ValidationPipe()) obj: Ooo): Ooo {
    console.log(obj);
    return obj;
  }
}

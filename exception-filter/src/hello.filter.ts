import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Catch(HttpException)
export class HelloFilter implements ExceptionFilter {
  @Inject(AppService)
  private readonly appService: AppService;

  catch(exception: HttpException, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const response = http.getResponse<Response>();
    const responseBody = exception.getResponse() as { message: string[] };
    const statusCode = exception.getStatus();
    response.status(statusCode).json({
      code: statusCode,
      error: 'Bad Request',
      message: responseBody?.message?.join(',') || exception.message,
      xxx: '111',
      appService: this.appService.getHello(),
    });
  }
}

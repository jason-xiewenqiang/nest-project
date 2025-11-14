import { NotFoundError } from './../../test-rxjs/node_modules/rxjs/dist/types/internal/util/NotFoundError.d';
import {
  CallHandler,
  ExecutionContext,
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import {
  catchError,
  Observable,
  throwError,
  timeout,
  TimeoutError,
} from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(3000),
      catchError((err) => {
        console.log(err instanceof TimeoutError);
        if (err instanceof TimeoutError) {
          console.log('Timeout error:', err);
          // return throwError(() => new RequestTimeoutException());
          return throwError(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            () => new HttpException('Request timeout', HttpStatus.FOUND),
          );
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return throwError(() => err);
      }),
    );
  }
}

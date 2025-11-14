import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AaaInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    console.log(`Before... ${now}`);

    return next.handle().pipe(
      tap(() => {
        const later = Date.now();
        console.log(`After... ${later} (Duration: ${later - now}ms)`);
      }),
    );
  }
}

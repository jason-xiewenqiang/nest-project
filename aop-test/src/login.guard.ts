import { CanActivate, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivate {
  canActivate(): boolean | Promise<boolean> | Observable<boolean> {
    console.log('LoginGuard canActivate');
    return true;
  }
}

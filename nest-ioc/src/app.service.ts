import { Inject, Injectable } from '@nestjs/common';
import { OtherService } from './other/other.service';

@Injectable()
export class AppService {
  @Inject(OtherService)
  private readonly otherService: OtherService;

  getHello(): string {
    // eslint-disable-next-line no-debugger
    debugger;
    return 'Hello World!' + this.otherService.xxx();
  }
}

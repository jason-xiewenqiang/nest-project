import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    @Inject('app_service') private readonly appService: AppService,
    @Inject('person') private readonly person: { name: string; age: number },
    @Inject('person2') private readonly person2: { name: string; desc: string },
    @Inject('person3') private readonly person3: { name: string; desc: string },
    @Inject('person5') private readonly person5: { name: string; desc: string },
    @Inject('person4') private readonly person4: { name: string; desc: string },
  ) {}

  @Get()
  getHello(): string {
    console.log(
      'Person Info:',
      this.person,
      this.person2,
      this.person3,
      this.person5,
      this.person4,
    );
    return (
      this.appService.getHello() +
      ` Person: ${this.person.name}, Age: ${this.person.age}, Person2: ${this.person2.name}, Desc: ${this.person2.desc}, Person3: ${this.person3.name}, Desc: ${this.person3.desc}, Person5: ${this.person5.name}, Desc: ${this.person5.desc} `
    );
  }
}

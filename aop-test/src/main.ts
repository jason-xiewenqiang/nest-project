import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TestFilter } from './test.filter';
// import { TimeInterceptor } from './time.interceptor';
// import { ValidatePipe } from './validate.pipe';
// import { LoginGuard } from './login.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use((_req, _res, next: () => void) => {
  //   console.log('Request...');
  //   next();
  //   console.log('Response...');
  // });
  // app.useGlobalGuards(new LoginGuard()); 全局的守卫
  // app.useGlobalInterceptors(new TimeInterceptor());
  // app.useGlobalPipes(new ValidatePipe());
  app.useGlobalFilters(new TestFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

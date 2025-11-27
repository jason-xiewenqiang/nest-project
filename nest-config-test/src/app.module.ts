import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { BbbModule } from './bbb/bbb.module';
import config2 from 'config2';
import config from 'config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config2, config],
    }),
    BbbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

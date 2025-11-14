import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BbbModule } from './bbb/bbb.module';
import { CccModule } from './ccc/ccc.module';

@Module({
  imports: [
    BbbModule.register({
      aaa: 'This is AAA config value',
      debug: true,
      bbbOption: 42,
    }),
    CccModule.register({
      aaa: 123,
      bbb: 'This is BBB config value',
      isGlobal: true,
    }),
    // CccModule.registerAsync({
    //   useFactory: async () => {
    //     // Simulate async operation, e.g., fetching from remote config service
    //     await new Promise((resolve) => setTimeout(resolve, 1000));
    //     return {
    //       aaa: 999,
    //       bbb: 'Async BBB config value',
    //     };
    //   },
    //   inject: [],
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

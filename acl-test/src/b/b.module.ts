import { Module } from '@nestjs/common';
import { BService } from './b.service';
import { BController } from './b.controller';

@Module({
  controllers: [BController],
  providers: [BService],
})
export class BModule {}

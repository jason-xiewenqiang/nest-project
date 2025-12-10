import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Role } from './user/entities/role.entry';
import { Permission } from './user/entities/permission.entry';
import { JwtModule } from '@nestjs/jwt';
import { AaaModule } from './aaa/aaa.module';
import { BbbModule } from './bbb/bbb.module';
import { APP_GUARD } from '@nestjs/core';
import { LoginGuard } from './user/login.guard';
import { PermissionGuard } from './user/permission.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'guang',
      signOptions: { expiresIn: '7d' },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'rbac_test',
      synchronize: true,
      logging: true,
      entities: [User, Role, Permission],
      poolSize: 10,
      connectorPackage: 'mysql2',
      extra: {
        authPlugin: 'sha256_password',
      },
    }),
    UserModule,
    AaaModule,
    BbbModule,
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: LoginGuard,
  }, {
    provide: APP_GUARD,
    useClass: PermissionGuard,
  }],
})
export class AppModule {}

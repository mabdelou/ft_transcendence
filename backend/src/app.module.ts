import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestController } from './test/test.controller';
import { WebsockGateway } from './websock/websock.gateway';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { AuthStrategy } from './auth/auth.strategy';
import { AuthController } from './auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from 'ormconfig';
import { GoogleStrategy } from './google.strategy';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/constants';
import { GameModule } from './game/PingPong.module';
import { Achievevement } from './entities/achievevements.entity';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [GameModule, AuthModule, TypeOrmModule.forRoot(config),
   
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..')
    }),
    UserModule, TypeOrmModule.forFeature([User,Achievevement]), JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '1d' },
   
  }),],
  controllers: [AppController, TestController, AuthController, UserController],

  providers: [
    AppService,
    WebsockGateway,
    AuthService,
    AuthStrategy,
    GoogleStrategy,
    UserService,
  ],
})
export class AppModule {}

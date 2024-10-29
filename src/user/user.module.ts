import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { Token } from '../auth/token.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [SequelizeModule.forFeature([User, Token]), AuthModule
  ],
  providers: [UserService, UserRepository, JwtService],
  controllers: [UserController],
})
export class UserModule { }

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { Token } from 'src/auth/token.model';
import { Role } from 'src/roles/roles.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { RolesService } from 'src/roles/roles.service';
import { RolesRepository } from 'src/roles/roles.repository';



@Module({
  imports: [
    SequelizeModule.forFeature([User, Token, Role]), AuthModule
  ],
  providers: [UserService, UserRepository, JwtService, JwtAuthGuard, RolesService, RolesRepository],
  controllers: [UserController],
})
export class UserModule { }

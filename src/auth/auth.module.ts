import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { UserRepository } from 'src/user/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt.guard';
import { GoogleStrategy } from './oauth2/google.strategy';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/user.model';
import { Token } from './token.model';
import { Role } from 'src/roles/roles.model';
import { RolesService } from 'src/roles/roles.service';
import { RolesRepository } from 'src/roles/roles.repository';

@Module({
    imports: [ConfigModule.forRoot(),
    SequelizeModule.forFeature([User, Token, Role]),
    JwtModule.register({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: { expiresIn: '1800s' },
    })

    ],
    providers: [AuthService, UserService, JwtStrategy, UserRepository, JwtAuthGuard, RolesService, RolesRepository, GoogleStrategy],
    controllers: [AuthController],
})


export class AuthModule { }

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { UserRepository } from 'src/user/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/user.model';

@Module({
    imports: [ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forFeature([User]),
    JwtModule.register({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: { expiresIn: '1800s' },
    })

    ],
    providers: [AuthService, UserService, JwtStrategy, UserRepository],
    controllers: [AuthController],
})


export class AuthModule { }

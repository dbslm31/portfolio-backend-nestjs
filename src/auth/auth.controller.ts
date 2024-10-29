import { Controller, Post, Body, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(
        @Body() userDto: { email: string; password: string },
        @Res() res: Response,
    ) {
        const user = await this.authService.validateUser(userDto.email, userDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const { access_token } = await this.authService.login(user);


        res.cookie('jwt', access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1800 * 1000
        });

        return res.send({ message: 'Login successful' });
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        // Supprimer le cookie contenant le token JWT
        response.cookie('jwt', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            expires: new Date(0)
        });

        return { message: 'Logged out successfully' };
    }
}

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

        // Envoyer le token dans un cookie HttpOnly
        res.cookie('jwt', access_token, {
            httpOnly: true,      // Protège le cookie contre l'accès JavaScript
            secure: process.env.NODE_ENV === 'production', // true en production, false en développement
            sameSite: 'strict',  // Bloque les envois entre sites
            maxAge: 1800 * 1000  // Durée de vie du cookie (30 minutes ici)
        });

        return res.send({ message: 'Login successful' });
    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        // Supprimer le cookie contenant le token JWT
        response.cookie('jwt', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // true en production, false en développement
            sameSite: 'strict',
            expires: new Date(0) // Définir la date d'expiration à une date passée
        });

        return { message: 'Logged out successfully' };
    }
}

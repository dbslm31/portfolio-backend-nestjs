import { Controller, Post, Get, Body, Res, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
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

    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth() {
        // Ce point de terminaison est utilisé uniquement pour initier la redirection vers Google.
    }

    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req, @Res() res: Response) {
        const { user, access_token } = req.user as any;

        if (!access_token) {
            console.error('Access token is undefined.');
            throw new UnauthorizedException('Token is missing or undefined.');
        }

        res.cookie('jwt', access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 1800 * 1000,
        });

        return res.redirect('http://localhost:3000/users/dashboard');
    }


}




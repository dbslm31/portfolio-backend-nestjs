import { Controller, Post, Body, UnauthorizedException, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() userDto: { email: string; password: string }) {
        const user = await this.authService.validateUser(userDto.email, userDto.password);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authService.login(user);
    }

    @Post('logout')
    async logout(@Headers('authorization') authHeader: string) {
        const token = authHeader?.split(' ')[1];
        if (!token) {
            throw new UnauthorizedException('Token is missing');
        }

        await this.authService.logout(token);
        return { message: 'Logged out successfully' };
    }
}

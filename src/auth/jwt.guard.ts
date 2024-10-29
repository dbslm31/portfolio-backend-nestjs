import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    private readonly jwtService: JwtService;

    constructor() {
        this.jwtService = new JwtService({
            secret: process.env.JWT_SECRET_KEY,
        });
    }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = request.cookies['jwt'];

        if (!token) {
            throw new UnauthorizedException('Token is missing');
        }

        try {
            const payload = this.jwtService.verify(token);
            request.user = payload;
            return true;
        } catch (err) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}

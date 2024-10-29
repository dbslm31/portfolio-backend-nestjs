import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../user/user.model';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();

        const user: User = request.user;
        console.log('User in RolesGuard:', user);

        const hasRole = () => user.role && requiredRoles.includes(user.role.name);


        if (user && hasRole()) {
            return true;
        }
        throw new ForbiddenException('You do not have the required role to access this resource');
    }
}

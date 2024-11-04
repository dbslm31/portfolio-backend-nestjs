import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { UserService } from 'src/user/user.service';
import { User } from '../../user/user.model';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService // Ajoutez "private readonly" ici pour créer la propriété
    ) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/google/callback',
            scope: ['email', 'profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any): Promise<{ user: User; access_token: string }> {
        const email = profile._json?.email;
        const displayName = profile.displayName || 'Unknown';

        if (!email) {
            throw new UnauthorizedException("Google profile is missing an email.");
        }

        // Rechercher l'utilisateur dans la base de données
        let user = await this.userService.findByEmail(email);

        // Créer un nouvel utilisateur si non trouvé
        if (!user) {
            user = await this.userService.createUser(displayName, email, "");
        }

        // Générer le token JWT pour cet utilisateur
        const payload = { username: user.username, email: user.email, sub: user.id, role: { name: 'client' } };
        const jwtToken = this.authService.generateToken(payload);

        // Enregistrer le token dans la base de données si nécessaire
        await this.authService.storeToken(jwtToken, user.id);

        // Retourner l'utilisateur et le token JWT
        return { user, access_token: jwtToken };
    }

}

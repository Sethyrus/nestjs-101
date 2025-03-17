import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(email: string, pass: string): Promise<any> {
        if (!email || !pass) {
            throw new UnauthorizedException();
        }

        const user = await this.usersService.findOne({ email });

        if (!user || !user.password) {
            throw new UnauthorizedException();
        }

        if (!bcrypt.compareSync(pass, user.password)) {
            throw new UnauthorizedException();
        }

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
        };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async register(
        email: string,
        password: string,
        name: string,
    ): Promise<any> {
        if (await this.usersService.findOne({ email })) {
            throw new UnauthorizedException();
        }

        const user = await this.usersService.create({
            email,
            password,
            name,
        });

        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
        };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}

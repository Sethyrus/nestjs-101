import {
    Body,
    Controller,
    Post,
    HttpCode,
    HttpStatus,
    UseGuards,
    Get,
    Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.email, signInDto.password);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    register(@Body() registerDto: Record<string, any>) {
        return this.authService.register(
            registerDto.email,
            registerDto.password,
            registerDto.name,
        );
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req: Request & { user: User }) {
        return req.user;
    }
}

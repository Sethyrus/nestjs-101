import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { EventsGateway } from './events/events.gateway';

@Module({
    imports: [AuthModule, UsersModule],
    controllers: [AppController],
    providers: [AppService, PrismaService, EventsGateway],
})
export class AppModule {}

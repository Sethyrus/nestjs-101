import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findOne({ email }: { email: string }): Promise<User | null> {
        return this.prisma.user.findFirst({
            where: { email },
        });
    }

    async create(data: { email: string; password: string; name: string }) {
        return this.prisma.user.create({ data });
    }
}

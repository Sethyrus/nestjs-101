import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    constructor() {
        super();
        const extended = this.$extends({
            query: {
                user: {
                    create: async ({ args, query }) => {
                        if (args.data.password) {
                            args.data.password = await bcrypt.hash(
                                args.data.password,
                                10,
                            );
                        }
                        return query(args);
                    },
                    update: async ({ args, query }) => {
                        if (typeof args.data.password === 'string') {
                            args.data.password = await bcrypt.hash(
                                args.data.password,
                                10,
                            );
                        } else {
                            delete args.data.password;
                        }
                        return query(args);
                    },
                },
            },
        });
        Object.assign(this, extended);
    }

    async onModuleInit() {
        await this.$connect();
    }
}

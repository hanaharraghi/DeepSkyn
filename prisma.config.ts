 import { defineConfig } from 'prisma';

import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";


const DATABASE_URL =
  process.env.DATABASE_URL ??
  "postgresql://postgres:12345@localhost:5433/deepskyn?schema=public";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }
}
  





export default defineConfig({
  schema: "prisma/schema.prisma",
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});
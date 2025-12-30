import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'generated/prisma/client';
import pg from 'pg';
import { DatabaseConnectionException } from 'src/domain/exception/application-exception/database-connection-exception';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private pool: pg.Pool;
  constructor() {
    const connectionString = process.env.DATABASE_URL;
    const pool = new pg.Pool({
      connectionString,
      max: 10,
      connectionTimeoutMillis: 5000
    });
    const adapter = new PrismaPg(pool);
    super({
      adapter,
      log: ['error', 'warn'],
    });
    this.pool = pool;
  }

  async onModuleInit() {
    try {
      await this.initializeDbConnection()
    } catch (error) {
      throw new DatabaseConnectionException(error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
    await this.pool.end();
  }

  async initializeDbConnection() {
      const client = await this.pool.connect();
      client.release();
      await this.$connect();
      console.log('db connected!!');
  }
}

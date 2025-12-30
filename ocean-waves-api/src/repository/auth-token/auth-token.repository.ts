import { Injectable } from '@nestjs/common';
import { Prisma, AuthToken } from 'generated/prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { BaseRepository } from '../base/base.repository';

@Injectable()
export class AuthTokenRepository extends BaseRepository<
  AuthToken,
  Prisma.AuthTokenWhereUniqueInput,
  Prisma.AuthTokenWhereInput,
  Prisma.AuthTokenCreateInput,
  Prisma.AuthTokenUpdateInput,
  Prisma.AuthTokenOrderByWithRelationInput
> {
  constructor(prisma: PrismaService) {
    super(prisma, 'authToken');
  }

  async findByToken(token: string): Promise<AuthToken | null> {
    return this.prisma.authToken.findUnique({
      where: { token },
    });
  }
}

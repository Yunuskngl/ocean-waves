import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma/client';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { BaseRepository } from '../base/base.repository';

@Injectable()
export class UserRepository extends BaseRepository<
  User,
  Prisma.UserWhereUniqueInput,
  Prisma.UserWhereInput,
  Prisma.UserCreateInput,
  Prisma.UserUpdateInput,
  Prisma.UserOrderByWithRelationInput
> {
  constructor(prisma: PrismaService) {
    super(prisma, 'user');
  }

  async createCustomerWithProfile(data: {
    email: string;
    password: string;
    fullName: string;
    phone: string | null;
  }): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        fullName: data.fullName,
      },
    });
  }

  async createRestaurantUserWithProfile(data: {
    email: string;
    password: string;
    fullName: string;
    phone: string | null;
  }): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        fullName: data.fullName,
      },
    });
  }
}

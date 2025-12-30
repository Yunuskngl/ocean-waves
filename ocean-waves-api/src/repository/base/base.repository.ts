import { PrismaService } from 'src/config/prisma/prisma.service';

export abstract class BaseRepository<
  TModel,
  TWhereUniqueInput,
  TWhereInput,
  TCreateInput,
  TUpdateInput,
  TOrderByInput,
> {
  constructor(
    protected readonly prisma: PrismaService,
    private readonly modelName: string,
  ) {}

  protected get model(): any {
    return (this.prisma as any)[this.modelName];
  }

  async create(data: TCreateInput): Promise<TModel> {
    return this.model.create({ data });
  }

  async findById(id: string): Promise<TModel | null> {
    return this.model.findUnique({
      where: { id } as TWhereUniqueInput,
    });
  }

  async findOne(where: TWhereUniqueInput): Promise<TModel | null> {
    return this.model.findUnique({ where });
  }

  async findMany(params?: {
    skip?: number;
    take?: number;
    where?: TWhereInput;
    orderBy?: TOrderByInput | TOrderByInput[];
  }): Promise<TModel[]> {
    const { skip, take, where, orderBy } = params || {};
    return this.model.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  async updateOne(
    where: TWhereUniqueInput,
    data: TUpdateInput,
  ): Promise<TModel> {
    return this.model.update({
      where,
      data,
    });
  }

  async updateMany(params: {
    where?: TWhereInput;
    data: TUpdateInput;
  }): Promise<{ count: number }> {
    const { where, data } = params;
    return this.model.updateMany({
      where,
      data,
    });
  }

  async deleteOne(where: TWhereUniqueInput): Promise<TModel> {
    return this.model.delete({ where });
  }

  async deleteMany(where?: TWhereInput): Promise<{ count: number }> {
    return this.model.deleteMany({
      where,
    });
  }
}

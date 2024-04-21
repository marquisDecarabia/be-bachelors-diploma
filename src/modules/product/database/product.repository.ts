import { ConsoleLogger, Injectable } from '@nestjs/common';
import {
  TypeormRepositoryBase,
  WhereCondition,
} from '@libs/ddd/infrastructure/database/base-classes/typeorm.repository.base';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { NotFoundException } from '@exceptions';
import {
  ProductEntity,
  ProductProps,
} from '@modules/product/domain/entities/product.entity';
import { Repository } from 'typeorm';
import { ProductOrmEntity } from '@modules/product/database/product.orm-entity';
import { ProductOrmMapper } from '@modules/product/database/product.orm-mapper';
import { ProductRepositoryPort } from '@modules/product/database/product.repository.port';

@Injectable()
export class ProductRepository
  extends TypeormRepositoryBase<ProductEntity, ProductProps, ProductOrmEntity>
  implements ProductRepositoryPort
{
  protected relations: string[] = [];

  constructor(
    @InjectRepository(ProductOrmEntity)
    private readonly ProductRepository: Repository<ProductOrmEntity>,
  ) {
    super(
      ProductRepository,
      new ProductOrmMapper(ProductEntity, ProductOrmEntity),
      new ConsoleLogger('ProductRepository'),
    );
  }

  private async findOneById(id: string): Promise<ProductOrmEntity | undefined> {
    return await this.ProductRepository.findOne({
      where: { id },
    });
  }

  async findOneByIdOrThrow(id: string): Promise<ProductEntity> {
    const product = await this.findOneById(id);
    if (!product) {
      throw new NotFoundException(`Product with id '${id}' not found`);
    }
    return this.mapper.toDomainEntity(product);
  }

  async exists(id: string): Promise<boolean> {
    const found = await this.findOneById(id);
    return !!found;
  }

  async findOne(
    params: QueryParams<ProductProps> = {},
  ): Promise<ProductEntity | undefined> {
    const where = this.prepareQuery(params);
    const found = await this.repository.findOne({
      where,
      relations: this.relations,
    });
    return found ? this.mapper.toDomainEntity(found) : undefined;
  }

  // Used to construct a query
  protected prepareQuery(
    params: QueryParams<ProductProps>,
  ): WhereCondition<ProductOrmEntity> {
    const where: QueryParams<ProductOrmEntity> = {};
    if (params.id) {
      where.id = params.id.value;
    }
    if (params.name) {
      where.name = params.name;
    }
    // if (params.p) {
    //   where.name = params.name;
    // }
    return where;
  }
}

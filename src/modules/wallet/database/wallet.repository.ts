import { ConsoleLogger, Injectable } from '@nestjs/common';
import {
  TypeormRepositoryBase,
  WhereCondition,
} from '@libs/ddd/infrastructure/database/base-classes/typeorm.repository.base';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { NotFoundException } from '@exceptions';
import { WalletRepositoryPort } from '@modules/wallet/database/wallet.repository.port';
import {
  WalletEntity,
  WalletProps,
} from '@modules/wallet/domain/entities/wallet.entity';
import { Repository } from 'typeorm';
import { WalletOrmMapper } from '@modules/wallet/database/wallet.orm-mapper';
import { WalletOrmEntity } from '@modules/wallet/database/wallet.orm-entity';

@Injectable()
export class WalletRepository
  extends TypeormRepositoryBase<WalletEntity, WalletProps, WalletOrmEntity>
  implements WalletRepositoryPort
{
  protected relations: string[] = [];

  constructor(
    @InjectRepository(WalletOrmEntity)
    private readonly WalletRepository: Repository<WalletOrmEntity>,
  ) {
    super(
      WalletRepository,
      new WalletOrmMapper(WalletEntity, WalletOrmEntity),
      new ConsoleLogger('WalletRepository'),
    );
  }

  private async findOneById(id: string): Promise<WalletOrmEntity | undefined> {
    return await this.WalletRepository.findOne({
      where: { id },
    });
  }

  async findOneByIdOrThrow(id: string): Promise<WalletEntity> {
    const wallet = await this.findOneById(id);
    if (!wallet) {
      throw new NotFoundException(`Wallet with id '${id}' not found`);
    }
    return this.mapper.toDomainEntity(wallet);
  }

  private async findOneByUserId(
    id: string,
  ): Promise<WalletOrmEntity | undefined> {
    return await this.WalletRepository.findOne({
      where: { userId: id },
    });
  }

  async findOneByUserIdOrThrow(id: string): Promise<WalletEntity> {
    const wallet = await this.findOneByUserId(id);
    if (!wallet) {
      throw new NotFoundException(`Wallet with user id '${id}' not found`);
    }
    return this.mapper.toDomainEntity(wallet);
  }

  async exists(id: string): Promise<boolean> {
    const found = await this.findOneById(id);
    return !!found;
  }

  protected prepareQuery(
    params: QueryParams<WalletProps>,
  ): WhereCondition<WalletOrmEntity> {
    const where: QueryParams<WalletOrmEntity> = {};
    if (params.id) {
      where.id = params.id.value;
    }
    return where;
  }
}

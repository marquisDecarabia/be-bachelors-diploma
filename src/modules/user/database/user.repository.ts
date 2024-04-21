import { ConsoleLogger, Injectable } from '@nestjs/common';
import {
  TypeormRepositoryBase,
  WhereCondition,
} from '@libs/ddd/infrastructure/database/base-classes/typeorm.repository.base';
import { InjectRepository } from '@nestjs/typeorm';
import { UserOrmEntity } from '@modules/user/database/user.orm-entity';
import {
  UserEntity,
  UserProps,
} from '@modules/user/domain/entities/user.entity';
import { Repository } from 'typeorm';
import { UserRepositoryPort } from '@modules/user/database/user.repository.port';
import { UserOrmMapper } from '@modules/user/database/user.orm-mapper';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { NotFoundException } from '@exceptions';

@Injectable()
export class UserRepository
  extends TypeormRepositoryBase<UserEntity, UserProps, UserOrmEntity>
  implements UserRepositoryPort
{
  protected relations: string[] = [];

  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly userRepository: Repository<UserOrmEntity>,
  ) {
    super(
      userRepository,
      new UserOrmMapper(UserEntity, UserOrmEntity),
      new ConsoleLogger('UserRepository'),
    );
  }

  private async findOneById(id: string): Promise<UserOrmEntity | undefined> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async findOneByIdOrThrow(id: string): Promise<UserEntity> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException(`User with id '${id}' not found`);
    }
    return this.mapper.toDomainEntity(user);
  }

  private async findOneByName(
    name: string,
  ): Promise<UserOrmEntity | undefined> {
    return await this.userRepository.findOne({
      where: { name },
    });
  }

  async findOneByNameOrThrow(name: string): Promise<UserEntity> {
    const user = await this.findOneByName(name);
    if (!user) {
      throw new NotFoundException(`User with name '${name}' not found`);
    }
    return this.mapper.toDomainEntity(user);
  }

  async exists(id: string): Promise<boolean> {
    const found = await this.findOneById(id);
    return !!found;
  }

  // Used to construct a query
  protected prepareQuery(
    params: QueryParams<UserProps>,
  ): WhereCondition<UserOrmEntity> {
    const where: QueryParams<UserOrmEntity> = {};
    if (params.id) {
      where.id = params.id.value;
    }
    if (params.name) {
      where.name = params.name;
    }
    return where;
  }
}

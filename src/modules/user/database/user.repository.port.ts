import { RepositoryPort } from '@libs/ddd/domain/ports/repository.ports';
import { UserEntity } from '../domain/entities/user.entity';

export interface UserRepositoryPort
  extends RepositoryPort<UserEntity, unknown> {
  findOneByIdOrThrow(id: string): Promise<UserEntity>;
  exists(id: string): Promise<boolean>;
}

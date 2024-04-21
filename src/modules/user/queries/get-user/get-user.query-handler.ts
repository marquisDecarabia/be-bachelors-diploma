import { QueryHandler } from '@nestjs/cqrs';
import { QueryHandlerBase } from '@libs/ddd/domain/base-classes/query-handler.base';
import { Result } from '@libs/ddd/domain/utils/result.util';
import { GetUserQuery } from '@modules/user/queries/get-user/get-user.query';
import { UserRepository } from '@modules/user/database/user.repository';
import { UserEntity } from '@modules/user/domain/entities/user.entity';

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler extends QueryHandlerBase {
  constructor(private readonly userRepo: UserRepository) {
    super();
  }

  async handle(query: GetUserQuery): Promise<Result<UserEntity>> {
    const user = await this.userRepo.findOneByIdOrThrow(query.id);
    return Result.ok(user);
  }
}

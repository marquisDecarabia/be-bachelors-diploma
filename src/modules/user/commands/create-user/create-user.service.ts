import { CommandHandler } from '@nestjs/cqrs';
import { CommandHandlerBase } from '@libs/ddd/domain/base-classes/command-handler.base';
import { UnitOfWork } from '@src/infrastructure/database/unit-of-work/unit-of-work';
import { Result } from '@libs/ddd/domain/utils/result.util';
import { ID } from '@libs/ddd/domain/value-objects/id.value-object';
import { CreateUserCommand } from '@modules/user/commands/create-user/create-user.command';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { UserRepositoryPort } from '@modules/user/database/user.repository.port';

@CommandHandler(CreateUserCommand)
export class CreateUserService extends CommandHandlerBase {
  constructor(protected readonly unitOfWork: UnitOfWork) {
    super(unitOfWork);
  }

  async handle(command: CreateUserCommand): Promise<Result<ID>> {
    const user = UserEntity.create({
      name: command.name,
    });
    const userRepo: UserRepositoryPort = this.unitOfWork.getUserRepository(
      command.correlationId,
    );
    const created = await userRepo.save(user);
    return Result.ok(created.id);
  }
}

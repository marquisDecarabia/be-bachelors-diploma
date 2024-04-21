import { GetUserHttpController } from '@modules/user/queries/get-user/get-user.http.controller';
import { UserRepository } from '@modules/user/database/user.repository';
import { GetUserQueryHandler } from '@modules/user/queries/get-user/get-user.query-handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from '@modules/user/database/user.orm-entity';
import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { CreateUserService } from '@modules/user/commands/create-user/create-user.service';
import { CreateUserHttpController } from '@modules/user/commands/create-user/create-user.http.controller';

const httpControllers = [GetUserHttpController, CreateUserHttpController];

const repositories = [UserRepository];

const queryHandlers = [GetUserQueryHandler];

const commandHandlers = [CreateUserService];

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity]), CqrsModule],
  controllers: [...httpControllers],
  providers: [...repositories, ...queryHandlers, ...commandHandlers],
})
export class UserModule {}

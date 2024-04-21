import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { routesV1 } from '@config/app.routes';
import { IdResponse } from '@libs/ddd/interface-adapters/dtos/id.response.dto';
import { Result } from '@libs/ddd/domain/utils/result.util';
import { ID } from '@libs/ddd/domain/value-objects/id.value-object';
import { CreateUserHttpRequest } from '@modules/user/commands/create-user/create-user.request.dto';
import { CreateUserCommand } from '@modules/user/commands/create-user/create-user.command';

@ApiTags(routesV1.user.tagInfo.name)
@Controller(routesV1.version)
export class CreateUserHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routesV1.user.root)
  @ApiOperation({
    summary: 'Create a user, wallet will be created automatically',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
    description: 'Created user id',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  async createUser(@Body() body: CreateUserHttpRequest): Promise<IdResponse> {
    const command = new CreateUserCommand(body);

    const result: Result<ID> = await this.commandBus.execute(command);

    return result.unwrap((id) => new IdResponse(id.value));
  }
}

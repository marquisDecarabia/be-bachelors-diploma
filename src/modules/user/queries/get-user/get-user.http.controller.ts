import { routesV1 } from '@config/app.routes';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { Result } from '@libs/ddd/domain/utils/result.util';
import { UserHttpResponse } from '@modules/user/dtos/user.response.dto';
import { GetUserQuery } from '@modules/user/queries/get-user/get-user.query';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { UserNotFoundError } from '@modules/user/errors/user.errors';

@ApiTags(routesV1.user.tagInfo.name)
@Controller(routesV1.version)
export class GetUserHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(routesV1.user.findById)
  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({
    name: 'id',
    description: 'User id (UUID v4)',
    example: '7e0154e2-aca2-4af6-92b4-bd5c517f5b36',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserHttpResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: UserNotFoundError.message,
  })
  async getUser(@Param('id') id: string): Promise<UserHttpResponse> {
    const query = new GetUserQuery({ id });
    const result: Result<UserEntity, UserNotFoundError> =
      await this.queryBus.execute(query);

    return result.unwrap(
      (user) => new UserHttpResponse(user),
      (error) => {
        if (error instanceof UserNotFoundError)
          throw new NotFoundException(error.message);
        throw error;
      },
    );
  }
}

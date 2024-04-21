import {
  BadRequestException,
  Body,
  Controller,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { routesV1 } from '@config/app.routes';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderHttpRequest } from '@modules/order/commands/create-order/create-order.request.dto';
import {
  NotEnoughFundsError,
  ProductUnavailableError,
} from '@modules/order/errors/order.errors';
import { IdResponse } from '@libs/ddd/interface-adapters/dtos/id.response.dto';
import { CreateOrderCommand } from '@modules/order/commands/create-order/create-order.command';
import { Result } from '@libs/ddd/domain/utils/result.util';
import { ID } from '@libs/ddd/domain/value-objects/id.value-object';
import { ConflictException } from '@exceptions';

@ApiTags(routesV1.order.tagInfo.name)
@Controller(routesV1.version)
export class CreateOrderHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routesV1.order.root)
  @ApiOperation({ summary: 'Create a order' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: NotEnoughFundsError.message,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: ProductUnavailableError.message,
  })
  async create(@Body() body: CreateOrderHttpRequest): Promise<IdResponse> {
    const command = new CreateOrderCommand(body);

    const result: Result<ID, NotEnoughFundsError | ProductUnavailableError> =
      await this.commandBus.execute(command);

    return result.unwrap(
      (id) => new IdResponse(id.value),
      (error) => {
        if (error instanceof NotEnoughFundsError)
          throw new BadRequestException(error.message);
        if (error instanceof ProductUnavailableError)
          throw new ConflictException(error.message);
        throw error;
      },
    );
  }
}

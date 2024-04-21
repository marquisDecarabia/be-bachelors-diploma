import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { routesV1 } from '@config/app.routes';
import { IdResponse } from '@libs/ddd/interface-adapters/dtos/id.response.dto';
import { Result } from '@libs/ddd/domain/utils/result.util';
import { ID } from '@libs/ddd/domain/value-objects/id.value-object';
import { CreateProductHttpRequest } from '@modules/product/commands/create-product/create-product.request.dto';
import { CreateProductCommand } from '@modules/product/commands/create-product/create-product.command';

@ApiTags(routesV1.product.tagInfo.name)
@Controller(routesV1.version)
export class CreateProductHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routesV1.product.root)
  @ApiOperation({ summary: 'Create a product' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
    description: 'Created product id',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
  })
  async createProduct(
    @Body() body: CreateProductHttpRequest,
  ): Promise<IdResponse> {
    const command = new CreateProductCommand(body);

    const result: Result<ID> = await this.commandBus.execute(command);

    return result.unwrap((id) => new IdResponse(id.value));
  }
}

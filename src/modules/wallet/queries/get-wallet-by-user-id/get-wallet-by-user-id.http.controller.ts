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
import { WalletHttpResponse } from '@modules/wallet/dtos/wallet.response.dto';
import { GetWalletByUserIdQuery } from '@modules/wallet/queries/get-wallet-by-user-id/get-wallet-by-user-id.query';
import { WalletEntity } from '@modules/wallet/domain/entities/wallet.entity';
import { WalletNotFoundByUserIdError } from '@modules/wallet/errors/wallet.errors';

@ApiTags(routesV1.wallet.tagInfo.name)
@Controller(routesV1.version)
export class GetWalletByUserIdHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(routesV1.wallet.findByUserId)
  @ApiOperation({ summary: 'Get wallet by user id' })
  @ApiParam({
    name: 'userId',
    description: 'User id (UUID v4)',
    example: '7e0154e2-aca2-4af6-92b4-bd5c517f5b36',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: WalletHttpResponse,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: WalletNotFoundByUserIdError.message,
  })
  async getWallet(
    @Param('userId') userId: string,
  ): Promise<WalletHttpResponse> {
    const query = new GetWalletByUserIdQuery({ userId });
    const result: Result<WalletEntity, WalletNotFoundByUserIdError> =
      await this.queryBus.execute(query);

    return result.unwrap(
      (wallet) => new WalletHttpResponse(wallet),
      (error) => {
        if (error instanceof WalletNotFoundByUserIdError)
          throw new NotFoundException(error.message);
        throw error;
      },
    );
  }
}

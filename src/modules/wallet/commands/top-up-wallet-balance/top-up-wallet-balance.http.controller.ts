import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { routesV1 } from '@config/app.routes';
import { TopUpWalletBalanceHttpRequest } from '@modules/wallet/commands/top-up-wallet-balance/top-up-wallet-balance.request.dto';
import { TopUpWalletBalanceCommand } from '@modules/wallet/commands/top-up-wallet-balance/top-up-wallet-balance.command';
import { WalletBalanceOverextended } from '@modules/wallet/errors/wallet.errors';
import { Result } from '@libs/ddd/domain/utils/result.util';
import { ConflictException } from '@exceptions';

@ApiTags(routesV1.wallet.tagInfo.name)
@Controller(routesV1.version)
export class TopUpWalletBalanceHttpController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(routesV1.wallet.topUp)
  @ApiOperation({ summary: 'Top up wallet balance' })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: WalletBalanceOverextended.message,
  })
  async topUpBalance(
    @Body() body: TopUpWalletBalanceHttpRequest,
  ): Promise<void> {
    const command = new TopUpWalletBalanceCommand(body);

    const result: Result<null, WalletBalanceOverextended> =
      await this.commandBus.execute(command);
    return result.unwrap(
      (ok) => ok,
      (error) => {
        if (error instanceof WalletBalanceOverextended)
          throw new ConflictException(error.message);
        throw error;
      },
    );
  }
}

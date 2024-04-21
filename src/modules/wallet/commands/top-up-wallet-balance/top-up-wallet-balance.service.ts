import { CommandHandlerBase } from '@libs/ddd/domain/base-classes/command-handler.base';
import { UnitOfWork } from '@src/infrastructure/database/unit-of-work/unit-of-work';
import { CommandHandler } from '@nestjs/cqrs';
import { Result } from '@libs/ddd/domain/utils/result.util';
import { TopUpWalletBalanceCommand } from '@modules/wallet/commands/top-up-wallet-balance/top-up-wallet-balance.command';
import { WalletRepositoryPort } from '@modules/wallet/database/wallet.repository.port';
import { WalletBalanceOverextended } from '@modules/wallet/errors/wallet.errors';

@CommandHandler(TopUpWalletBalanceCommand)
export class TopUpWalletBalanceService extends CommandHandlerBase {
  constructor(protected readonly unitOfWork: UnitOfWork) {
    super(unitOfWork);
  }

  async handle(command: TopUpWalletBalanceCommand): Promise<Result<null>> {
    const walletRepo: WalletRepositoryPort =
      this.unitOfWork.getWalletRepository(command.correlationId);
    const wallet = await walletRepo.findOneByIdOrThrow(command.walletId);
    // TODO correct place for such validation in domain model (prob)
    if (wallet.balance + command.amount >= 1000000) {
      return Result.err(new WalletBalanceOverextended());
    }
    wallet.topUp(command.amount);
    await walletRepo.save(wallet);
    return Result.ok(null);
  }
}

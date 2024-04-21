import { QueryHandler } from '@nestjs/cqrs';
import { QueryHandlerBase } from '@libs/ddd/domain/base-classes/query-handler.base';
import { Result } from '@libs/ddd/domain/utils/result.util';
import { GetWalletByUserIdQuery } from '@modules/wallet/queries/get-wallet-by-user-id/get-wallet-by-user-id.query';
import { WalletRepository } from '@modules/wallet/database/wallet.repository';
import { WalletEntity } from '@modules/wallet/domain/entities/wallet.entity';

@QueryHandler(GetWalletByUserIdQuery)
export class GetWalletByUserIdQueryHandler extends QueryHandlerBase {
  constructor(private readonly walletRepo: WalletRepository) {
    super();
  }

  async handle(query: GetWalletByUserIdQuery): Promise<Result<WalletEntity>> {
    const wallet = await this.walletRepo.findOneByUserIdOrThrow(query.userId);
    return Result.ok(wallet);
  }
}

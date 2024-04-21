import { RepositoryPort } from '@libs/ddd/domain/ports/repository.ports';
import {
  WalletEntity,
  WalletProps,
} from '@modules/wallet/domain/entities/wallet.entity';

export interface WalletRepositoryPort
  extends RepositoryPort<WalletEntity, WalletProps> {
  findOneByIdOrThrow(id: string): Promise<WalletEntity>;
  findOneByUserIdOrThrow(id: string): Promise<WalletEntity>;
  exists(id: string): Promise<boolean>;
}

import {
  Command,
  CommandProps,
} from '@libs/ddd/domain/base-classes/command.base';

export class TopUpWalletBalanceCommand extends Command {
  constructor(props: CommandProps<TopUpWalletBalanceCommand>) {
    super(props);
    this.walletId = props.walletId;
    this.amount = props.amount;
  }
  readonly walletId: string;

  readonly amount: number;
}

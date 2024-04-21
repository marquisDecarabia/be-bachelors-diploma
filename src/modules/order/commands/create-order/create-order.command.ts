import {
  Command,
  CommandProps,
} from '@libs/ddd/domain/base-classes/command.base';

export class CreateOrderCommand extends Command {
  constructor(props: CommandProps<CreateOrderCommand>) {
    super(props);
    this.userId = props.userId;
    this.productId = props.productId;
  }

  readonly userId: string;

  readonly productId: string;
}

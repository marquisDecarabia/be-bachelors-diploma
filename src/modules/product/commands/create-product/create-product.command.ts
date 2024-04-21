import {
  Command,
  CommandProps,
} from '@libs/ddd/domain/base-classes/command.base';
import { Currencies } from '@libs/ddd/domain/types/currency.enum';

export class CreateProductCommand extends Command {
  constructor(props: CommandProps<CreateProductCommand>) {
    super(props);
    this.name = props.name;
    this.price = props.price;
    this.currency = props.currency;
  }

  readonly name: string;

  readonly price: number;

  readonly currency: Currencies;
}

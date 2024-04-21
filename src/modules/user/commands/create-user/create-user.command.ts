import {
  Command,
  CommandProps,
} from '@libs/ddd/domain/base-classes/command.base';

export class CreateUserCommand extends Command {
  constructor(props: CommandProps<CreateUserCommand>) {
    super(props);
    this.name = props.name;
  }

  readonly name: string;
}

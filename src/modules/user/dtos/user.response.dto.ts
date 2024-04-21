import { ResponseBase } from '@libs/ddd/interface-adapters/base-classes/response.base';
import { User } from '@src/interface-adapters/interfaces/user/user.interface';
import { UserEntity } from '@modules/user/domain/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponse extends ResponseBase implements User {
  constructor(user: UserEntity) {
    super(user);
    const props = user.getPropsCopy();
    this.name = props.name;
  }

  @ApiProperty({
    example: 'Jhon Doe',
    description: 'User name',
  })
  name: string;
}

export class UserHttpResponse extends UserResponse implements User {}

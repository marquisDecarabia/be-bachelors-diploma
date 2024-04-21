import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { CreateUser } from '@src/interface-adapters/interfaces/user/create.user.interface';

export class CreateUserRequest implements CreateUser {
  // TODO correct validation
  @ApiProperty({
    example: 'Jane Doe',
    description: 'User name',
  })
  @MinLength(2)
  @MaxLength(100)
  @IsString()
  readonly name: string;
}

export class CreateUserHttpRequest
  extends CreateUserRequest
  implements CreateUser {}

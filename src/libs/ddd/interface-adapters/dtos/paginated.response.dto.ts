import { Paginated } from '@libs/ddd/interface-adapters/interfaces/paginated.interface';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseDto<T> implements Paginated<T> {
  constructor(props: Paginated<T>) {
    this.data = props.data;
    this.count = props.count;
    this.limit = props.limit;
    this.page = props.page;
  }

  data: Array<T>;

  @ApiProperty({
    example: 75,
    type: Number,
  })
  count: number;

  @ApiProperty({
    example: 10,
    type: Number,
  })
  limit: number;

  @ApiProperty({
    example: 1,
    type: Number,
  })
  page: number;
}

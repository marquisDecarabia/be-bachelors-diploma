import { PaginatedResponseDto } from '@libs/ddd/interface-adapters/dtos/paginated.response.dto';

export class ResponsePaginated<T> extends PaginatedResponseDto<T> {
  constructor(props) {
    super(props);
  }
}

import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import {
  ArgumentInvalidException,
  ArgumentOutOfRangeException,
} from '@exceptions';
import { ProductStatuses } from '@modules/product/domain/entities/product.types';
import { Currencies } from '@libs/ddd/domain/types/currency.enum';

export interface CreateProductProps {
  name: string;
  price: number;
  currency: Currencies;
}

export interface ProductProps extends CreateProductProps {
  status: ProductStatuses;
}

export class ProductEntity extends AggregateRoot<ProductProps> {
  protected readonly _id: UUID;

  static create(create: CreateProductProps): ProductEntity {
    const id = UUID.generate();
    const props: ProductProps = {
      ...create,
      status: ProductStatuses.available,
    };

    return new ProductEntity({ id, props });
  }

  get price(): number {
    return this.props.price;
  }

  get status(): ProductStatuses {
    return this.props.status;
  }

  get productInfo(): string {
    const productInfo = {
      name: this.props.name,
      price: this.props.price,
      currency: this.props.currency,
    };
    return JSON.stringify(productInfo);
  }

  hideProduct(): void {
    this.props.status = ProductStatuses.unavailable;
  }

  sellProduct(): void {
    this.props.status = ProductStatuses.sold;
  }

  static validate(props: ProductProps): void {
    if (props.price <= 0) {
      throw new ArgumentOutOfRangeException(
        'Product price cannot be less than 0',
      );
    }
    if (!(props.currency in Currencies)) {
      throw new ArgumentInvalidException('Incorrect currency provided');
    }
    if (!(props.status in ProductStatuses)) {
      throw new ArgumentInvalidException('Incorrect status provided');
    }
  }
}

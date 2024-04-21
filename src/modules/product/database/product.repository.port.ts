import { RepositoryPort } from '@libs/ddd/domain/ports/repository.ports';
import {
  ProductEntity,
  ProductProps,
} from '@modules/product/domain/entities/product.entity';

export interface ProductRepositoryPort
  extends RepositoryPort<ProductEntity, ProductProps> {
  findOneByIdOrThrow(id: string): Promise<ProductEntity>;
  exists(id: string): Promise<boolean>;
}

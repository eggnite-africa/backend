import { ObjectType, Field } from 'type-graphql';
import { Product } from '../product.entity';

@ObjectType()
export class Products {
	@Field(() => [Product])
	products!: Product[];

	@Field(() => Boolean)
	hasMore!: boolean;
}

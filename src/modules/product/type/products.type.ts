import { ObjectType, Field, Int } from 'type-graphql';
import { Product } from '../product.entity';

@ObjectType()
export class Products {
	@Field(() => Int)
	totalCount!: number;

	@Field(() => [Product], { nullable: 'itemsAndList' })
	products!: Product[];

	@Field(() => Boolean)
	hasMore!: boolean;
}

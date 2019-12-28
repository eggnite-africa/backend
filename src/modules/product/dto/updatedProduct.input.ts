import { InputType, Field, ID } from 'type-graphql';
import { MediaInput } from './media.input';
import { Product } from '../product.entity';
import { Length } from 'class-validator';

@InputType()
export class UpdatedProductInput implements Partial<Product> {
	@Field(() => ID)
	id!: number;

	@Field(() => String, { nullable: true })
	@Length(10, 140)
	tagline?: string;

	@Field(() => String, { nullable: true })
	description?: string;

	@Field(() => [String], {
		nullable: 'itemsAndList',
		defaultValue: undefined
	})
	links?: string[];

	@Field(() => MediaInput, { nullable: true })
	Media?: MediaInput;
}

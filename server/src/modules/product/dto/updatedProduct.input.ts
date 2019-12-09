import { InputType, Field, ID } from 'type-graphql';
import { MediaInput } from './media.input';
import { Product } from '../product.entity';
import { Length } from 'class-validator';

@InputType()
export class updatedProductInput implements Partial<Product> {
	@Field(type => ID)
	id!: number;

	@Field(type => String, { nullable: true })
	@Length(10, 140)
	tagline?: string;

	@Field(type => String, { nullable: true })
	description?: string;

	@Field(type => [String], {
		nullable: 'itemsAndList',
		defaultValue: undefined
	})
	links?: string[];

	@Field(type => MediaInput, { nullable: true })
	Media?: MediaInput;
}

import { InputType, Field, ID } from 'type-graphql';
import { MediaInput } from './media.input';
import { Product } from '../product.entity';

@InputType()
export class updatedProductInput implements Partial<Product> {
	@Field(type => ID)
	id: string;

	@Field(type => String, { nullable: true })
	tagline?: string;

	@Field(type => String, { nullable: true })
	description?: string;

	@Field(type => [String], { nullable: 'itemsAndList' })
	links?: string[];

	@Field(type => MediaInput, { nullable: true })
	Media?: MediaInput;
}

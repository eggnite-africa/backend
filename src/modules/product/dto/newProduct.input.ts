import { InputType, Field, ID } from 'type-graphql';
import { Length } from 'class-validator';
import { MediaInput } from './media.input';
import { Product } from '../product.entity';

@InputType()
export class newProductInput implements Partial<Product> {
	@Field(type => String)
	name!: string;

	@Field(type => String)
	@Length(50, 140)
	tagline!: string;

	@Field(type => String, { nullable: true })
	description?: string;

	@Field(type => [String], { nullable: true })
	links!: string[];

	@Field(type => MediaInput)
	media!: MediaInput;

	@Field(type => [ID], { nullable: true })
	makersIds!: number[];
}

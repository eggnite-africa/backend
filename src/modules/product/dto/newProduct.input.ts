import { InputType, Field, ID } from 'type-graphql';
import { MaxLength, IsNotEmpty } from 'class-validator';
import { MediaInput } from './media.input';
import { Product } from '../product.entity';

@InputType()
export class newProductInput implements Partial<Product> {
	@Field(type => String)
	@IsNotEmpty()
	name!: string;

	@Field(type => String)
	@MaxLength(140)
	@IsNotEmpty()
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

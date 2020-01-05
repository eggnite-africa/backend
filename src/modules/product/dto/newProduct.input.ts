import { InputType, Field, ID } from 'type-graphql';
import { IsNotEmpty } from 'class-validator';
import { MediaInput } from './media.input';
import { Product } from '../product.entity';

@InputType()
export class NewProductInput implements Partial<Product> {
	@Field(() => String)
	@IsNotEmpty()
	name!: string;

	@Field(() => String)
	@IsNotEmpty()
	tagline!: string;

	@Field(() => String, { nullable: true })
	description?: string;

	@Field(() => [String], { nullable: true })
	links!: string[];

	@Field(() => MediaInput)
	media!: MediaInput;

	@Field(() => [ID], { nullable: true })
	makersIds!: number[];
}

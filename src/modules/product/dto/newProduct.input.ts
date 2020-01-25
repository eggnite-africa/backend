import { InputType, Field, ID } from 'type-graphql';
import { IsNotEmpty } from 'class-validator';
import { MediaInput } from './media.input';
import { NewLinksInput } from '../../product-links/dto/newLinks.input';

@InputType()
export class NewProductInput {
	@Field(() => String)
	@IsNotEmpty()
	name!: string;

	@Field(() => String)
	@IsNotEmpty()
	tagline!: string;

	@Field(() => String, { nullable: true })
	description?: string;

	@Field(() => MediaInput)
	media!: MediaInput;

	@Field(() => NewLinksInput)
	links!: NewLinksInput;

	@Field(() => [ID])
	makersIds!: number[];
}

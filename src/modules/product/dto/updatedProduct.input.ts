import { InputType, Field, ID } from 'type-graphql';
import { MediaInput } from './media.input';
import { Length } from 'class-validator';
import { UpdatedLinksInput } from '../../product-links/dto/updatedLinks.input';

@InputType()
export class UpdatedProductInput {
	@Field(() => ID)
	id!: number;

	@Field(() => String, { nullable: true })
	@Length(10, 140)
	tagline?: string;

	@Field(() => String, { nullable: true })
	description?: string;

	@Field(() => MediaInput, { nullable: true })
	media?: MediaInput;

	@Field(() => UpdatedLinksInput, { nullable: true })
	links?: UpdatedLinksInput;
}

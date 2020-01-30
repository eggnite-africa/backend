import { InputType, Field, ID } from 'type-graphql';
import { Length } from 'class-validator';
import { UpdatedLinksInput } from '../../product-links/dto/updatedLinks.input';
import { UpdatedMediaInput } from './updatedMedia.input';

@InputType()
export class UpdatedProductInput {
	@Field(() => ID)
	id!: number;

	@Field(() => String, { nullable: true })
	@Length(10, 140)
	tagline?: string;

	@Field(() => String, { nullable: true })
	description?: string;

	@Field(() => UpdatedMediaInput, { nullable: true })
	media?: UpdatedMediaInput;

	@Field(() => UpdatedLinksInput, { nullable: true })
	links?: UpdatedLinksInput;
}

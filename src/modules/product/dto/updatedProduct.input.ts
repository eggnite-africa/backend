import { InputType, Field, ID } from 'type-graphql';
import { MaxLength, IsOptional } from 'class-validator';
import { UpdatedLinksInput } from '../../product-links/dto/updatedLinks.input';
import { UpdatedMediaInput } from './updatedMedia.input';

@InputType()
export class UpdatedProductInput {
	@Field(() => ID)
	id!: number;

	@Field(() => String, { nullable: true })
	@MaxLength(80)
	@IsOptional()
	tagline?: string;

	@Field(() => String, { nullable: true })
	@IsOptional()
	description?: string;

	@Field(() => UpdatedMediaInput, { nullable: true })
	@IsOptional()
	media?: UpdatedMediaInput;

	@Field(() => UpdatedLinksInput, { nullable: true })
	@IsOptional()
	links?: UpdatedLinksInput;
}

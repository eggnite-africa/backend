import { InputType, Field, ID } from 'type-graphql';
import {
	IsNotEmpty,
	MaxLength,
	IsNumberString,
	ValidateNested,
	IsOptional
} from 'class-validator';
import { NewMediaInput } from './newMedia.input';
import { NewLinksInput } from '../../product-links/dto/newLinks.input';

@InputType()
export class NewProductInput {
	@Field(() => String)
	@IsNotEmpty()
	name!: string;

	@Field(() => String)
	@IsNotEmpty()
	@MaxLength(80)
	tagline!: string;

	@Field(() => String)
	@IsNotEmpty()
	@MaxLength(280)
	description!: string;

	@Field(() => NewMediaInput)
	@ValidateNested()
	media!: NewMediaInput;

	@Field(() => NewLinksInput, { nullable: true })
	@ValidateNested()
	@IsOptional()
	links?: NewLinksInput;

	@Field(() => [ID])
	@IsNotEmpty({ each: true })
	@IsNumberString({ each: true })
	makersIds!: number[];
}

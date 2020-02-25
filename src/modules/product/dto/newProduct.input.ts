import { InputType, Field, ID } from 'type-graphql';
import {
	IsNotEmpty,
	MaxLength,
	IsNumberString,
	IsOptional,
	ValidateNested
} from 'class-validator';
import { NewMediaInput } from './newMedia.input';
import { NewLinksInput } from '../../product-links/dto/newLinks.input';
import { Type } from 'class-transformer';

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
	@ValidateNested() // perform validation on children too
	@Type(() => NewMediaInput) // cast the payload to the correct DTO type
	media!: NewMediaInput;

	@Field(() => NewLinksInput, { nullable: true })
	@IsOptional()
	links?: NewLinksInput;

	@Field(() => [ID])
	@IsNotEmpty({ each: true })
	@IsNumberString({ each: true })
	makersIds!: number[];
}

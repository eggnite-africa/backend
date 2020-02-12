import { InputType, Field, ID } from 'type-graphql';
import {
	IsNotEmpty,
	MaxLength,
	IsOptional,
	IsNumberString
} from 'class-validator';
import { MediaInput } from './media.input';
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

	@Field(() => MediaInput)
	media!: MediaInput;

	@Field(() => NewLinksInput)
	links!: NewLinksInput;

	@Field(() => [ID])
	@IsNotEmpty({ each: true })
	@IsNumberString({ each: true })
	makersIds!: number[];
}

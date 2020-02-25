import { InputType, Field } from 'type-graphql';
import { Media } from './media.type';
import { IsOptional, ArrayNotEmpty } from 'class-validator';

@InputType()
export class NewMediaInput implements Partial<Media> {
	@Field(() => String, { nullable: true })
	@IsOptional()
	logo?: string;

	@Field(() => [String])
	@ArrayNotEmpty()
	pictures!: string[];

	@Field(() => [String], { nullable: 'itemsAndList' })
	@IsOptional()
	videos?: string[];
}

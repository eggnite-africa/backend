import { InputType, Field } from 'type-graphql';
import { Media } from './media.type';
import { IsOptional, IsString, MinLength } from 'class-validator';

@InputType()
export class UpdatedMediaInput implements Partial<Media> {
	@Field(() => String, { nullable: true })
	@IsString()
	@IsOptional()
	logo?: string;

	@Field(() => [String], { nullable: 'itemsAndList' })
	@IsString({ each: true })
	@MinLength(1)
	@IsOptional()
	pictures?: string[];

	@Field(() => [String], { nullable: 'itemsAndList' })
	@IsString({ each: true })
	@IsOptional()
	videos?: string[];
}

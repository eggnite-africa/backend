import { InputType, Field } from 'type-graphql';
import { Media } from './media.type';
import { IsString, IsOptional, MinLength } from 'class-validator';

@InputType()
export class MediaInput implements Partial<Media> {
	@Field(() => String)
	@IsString()
	logo!: string;

	@Field(() => [String])
	@IsString({ each: true })
	@MinLength(2)
	pictures!: string[];

	@Field(() => [String], { nullable: 'itemsAndList' })
	@IsString({ each: true })
	@IsOptional()
	videos?: string[];
}

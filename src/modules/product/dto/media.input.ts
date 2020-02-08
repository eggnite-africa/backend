import { InputType, Field } from 'type-graphql';
import { Media } from './media.type';
import { IsFQDN, IsString, IsOptional } from 'class-validator';

@InputType()
export class MediaInput implements Partial<Media> {
	@Field(() => String)
	@IsFQDN()
	logo!: string;

	@Field(() => [String])
	@IsString({ each: true })
	pictures!: string[];

	@Field(() => [String], { nullable: 'itemsAndList' })
	@IsString({ each: true })
	@IsOptional()
	videos?: string[];
}

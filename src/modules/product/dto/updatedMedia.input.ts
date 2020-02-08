import { InputType, Field } from 'type-graphql';
import { Media } from './media.type';
import { IsFQDN, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdatedMediaInput implements Partial<Media> {
	@Field(() => String, { nullable: true })
	@IsFQDN()
	@IsOptional()
	logo?: string;

	@Field(() => [String], { nullable: 'itemsAndList' })
	@IsString({ each: true })
	@IsOptional()
	pictures?: string[];

	@Field(() => [String], { nullable: 'itemsAndList' })
	@IsString({ each: true })
	@IsOptional()
	videos?: string[];
}

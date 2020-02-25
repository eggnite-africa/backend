import { ObjectType, Field } from 'type-graphql';
import { IsString, IsOptional, MinLength } from 'class-validator';
@ObjectType()
export class Media {
	@Field(() => String)
	@IsString()
	@IsOptional()
	logo?: string;

	@Field(() => [String])
	@IsString({ each: true })
	@MinLength(1)
	pictures!: string[];

	@Field(() => [String], { nullable: 'itemsAndList' })
	@IsString({ each: true })
	@IsOptional()
	videos?: string[];
}

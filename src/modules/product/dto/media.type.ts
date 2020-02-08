import { ObjectType, Field } from 'type-graphql';
import { IsFQDN, IsString, IsOptional } from 'class-validator';
@ObjectType()
export class Media {
	@Field(() => String)
	@IsFQDN()
	logo!: string;

	@Field(() => [String])
	@IsString({ each: true })
	@IsOptional()
	pictures!: string[];

	@Field(() => [String], { nullable: 'itemsAndList' })
	@IsString({ each: true })
	@IsOptional()
	videos?: string[];
}

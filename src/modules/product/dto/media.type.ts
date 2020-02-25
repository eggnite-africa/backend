import { ObjectType, Field } from 'type-graphql';
import { IsOptional, ArrayNotEmpty } from 'class-validator';
@ObjectType()
export class Media {
	@Field(() => String)
	@IsOptional()
	logo?: string;

	@Field(() => [String])
	@ArrayNotEmpty()
	pictures!: string[];

	@Field(() => [String], { nullable: 'itemsAndList' })
	@ArrayNotEmpty()
	@IsOptional()
	videos?: string[];
}

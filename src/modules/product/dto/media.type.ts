import { ObjectType, Field } from 'type-graphql';
import { IsFQDN } from 'class-validator';
@ObjectType()
export class Media {
	@Field(() => String)
	@IsFQDN()
	logo!: string;

	@Field(() => [String])
	pictures!: string[];

	@Field(() => [String], { nullable: 'itemsAndList' })
	videos?: string[];
}

import { ObjectType, Field } from 'type-graphql';
import { IsFQDN } from 'class-validator';
@ObjectType()
export class Media {
	@Field(type => String)
	@IsFQDN()
	logo!: string;

	@Field(type => [String])
	pictures!: string[];

	@Field(type => [String], { nullable: 'itemsAndList' })
	videos?: string[];
}

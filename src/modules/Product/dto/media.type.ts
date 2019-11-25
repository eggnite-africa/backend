import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class Media {
	@Field(type => String)
	logo: string;

	@Field(type => [String])
	pictures: string[];

	@Field(type => [String], { nullable: 'itemsAndList' })
	videos?: string[];
}

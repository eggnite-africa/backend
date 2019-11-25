import { InputType, Field } from 'type-graphql';

@InputType()
export class MediaInput {
	@Field(type => String)
	logo: string;

	@Field(type => [String])
	pictures: string[];

	@Field(type => [String], { nullable: 'itemsAndList' })
	videos?: string[];
}

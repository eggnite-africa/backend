import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class VoteInput {
	@Field(type => ID)
	productId: number;

	@Field(type => ID)
	voterId: number;
}

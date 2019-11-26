import { InputType, Field, ID } from 'type-graphql';
import { Vote } from '../vote.entity';

@InputType()
export class VoteInput implements Partial<Vote> {
	@Field(type => ID)
	productId: number;

	@Field(type => ID)
	voterId: number;
}

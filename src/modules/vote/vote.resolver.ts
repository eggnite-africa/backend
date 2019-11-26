import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Vote } from './vote.entity';
import { VoteService } from './vote.service';
import { VoteInput } from './dto/newVote.input';

@Resolver(of => Vote)
export class VoteResolver {
	constructor(private readonly voteService: VoteService) {}

	@Mutation(returns => Vote)
	async upvote(@Args('voteInput') voteInput: VoteInput): Promise<Vote> {
		return await this.voteService.addVote(
			voteInput.productId,
			voteInput.voterId
		);
	}

	@Mutation(returns => Boolean)
	async deleteVote(@Args('voteInput') voteInput: VoteInput) {
		return await this.voteService.removeVote(
			voteInput.productId,
			voteInput.voterId
		);
	}
}

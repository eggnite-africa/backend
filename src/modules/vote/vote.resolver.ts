import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Vote } from './vote.entity';
import { VoteService } from './vote.service';
import { VoteInput } from './dto/newVote.input';
import { User } from '../user/user.entity';
import { CurrentUser } from '../user/decorator/user.decorator';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuth } from '../auth/guard/GqlAuth.guard';

@UseGuards(GraphQLAuth)
@Resolver((of: any) => Vote)
export class VoteResolver {
	constructor(private readonly voteService: VoteService) {}

	@Mutation(returns => Vote)
	async upvote(
		@Args('voteInput') { productId }: VoteInput,
		@CurrentUser() { id: UserId }: User
	): Promise<Vote> {
		return await this.voteService.addVote(productId, UserId);
	}

	@Mutation(returns => Boolean)
	async deleteVote(
		@Args('voteInput') { productId }: VoteInput,
		@CurrentUser() { id: UserId }: User
	) {
		return await this.voteService.removeVote(productId, UserId);
	}
}

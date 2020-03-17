import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Vote } from './vote.entity';
import { VoteService } from './vote.service';
import { VoteInput } from './dto/newVote.input';
import { User } from '../user/user.entity';
import { CurrentUser } from '../user/decorator/user.decorator';
import { UseGuards, InternalServerErrorException } from '@nestjs/common';
import { GraphQLAuth } from '../auth/guard/GqlAuth.guard';

@UseGuards(GraphQLAuth)
@Resolver(() => Vote)
export class VoteResolver {
	constructor(private readonly voteService: VoteService) {}

	@Mutation(() => Vote)
	async upvote(
		@Args('voteInput') { productId }: VoteInput,
		@CurrentUser() { id: UserId }: User
	): Promise<Vote> {
		if (!productId) throw new InternalServerErrorException();
		return await this.voteService.addVote(productId, UserId);
	}

	@Mutation(() => Boolean)
	async deleteVote(
		@Args('voteInput') { productId }: VoteInput,
		@CurrentUser() { id: UserId }: User
	): Promise<boolean> {
		if (!productId) throw new InternalServerErrorException();
		return await this.voteService.deleteVote(productId, UserId);
	}

	@Mutation(() => Vote)
	async addClap(
		@Args('voteInput') { pitchId }: VoteInput,
		@CurrentUser() { id: UserId }: User
	): Promise<Vote> {
		if (!pitchId) throw new InternalServerErrorException();
		return await this.voteService.addClap(pitchId, UserId);
	}

	@Mutation(() => Boolean)
	async deleteClap(
		@Args('voteInput') { pitchId }: VoteInput,
		@CurrentUser() { id: UserId }: User
	): Promise<boolean> {
		if (!pitchId) throw new InternalServerErrorException();
		return await this.voteService.deleteClap(pitchId, UserId);
	}
}

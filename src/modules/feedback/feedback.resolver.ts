import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuth } from '../auth/guard/GqlAuth.guard';
import { FeedbackService } from './feedback.service';
import { ID } from 'type-graphql';
import { NewFeedbackInput } from './dto/newFeedback.input';
import { Feedback } from './feedback.entity';
import { CurrentUser } from '../user/decorator/user.decorator';
import { User } from '../user/user.entity';

@Resolver(() => Feedback)
export class FeedbackResolver {
	constructor(private readonly feedbackService: FeedbackService) {}
	@Query(() => [Feedback], { nullable: 'itemsAndList' })
	@UseGuards(GraphQLAuth)
	async fetchAllFeedback(): Promise<Feedback[]> {
		return await this.feedbackService.fetchAllFeedback();
	}

	@Query(() => [Feedback], { nullable: 'itemsAndList' })
	@UseGuards(GraphQLAuth)
	async fetchFeedbackByUserId(
		@Args({ name: 'userId', type: () => ID }) userId: number
	): Promise<Feedback[]> {
		return await this.feedbackService.fetchFeedbackByUserId(userId);
	}

	@Mutation(() => Feedback)
	@UseGuards(GraphQLAuth)
	async addFeedback(
		@Args({ name: 'feedback', type: () => NewFeedbackInput })
		userFeedback: NewFeedbackInput,
		@CurrentUser() { id: userId }: User
	): Promise<Feedback> {
		return await this.feedbackService.addFeedback(userId, userFeedback);
	}

	@Mutation(() => Feedback)
	async markFeedbackAsDone(
		@Args({ name: 'id', type: () => ID }) id: number
	): Promise<Feedback> {
		return await this.feedbackService.markAsDone(id);
	}

	@Mutation(() => Feedback)
	async markFeedbackAsRefused(
		@Args({ name: 'id', type: () => ID }) id: number,
		@Args({ name: 'reason', type: () => String, nullable: true }) reason: string
	): Promise<Feedback> {
		return await this.feedbackService.markAsRefused(id, reason);
	}
}

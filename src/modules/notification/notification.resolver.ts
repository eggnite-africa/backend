/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Resolver, Subscription, Mutation, Args } from '@nestjs/graphql';
import { ID } from 'type-graphql';
import { Vote } from '../vote/vote.entity';
import { Inject, UseGuards } from '@nestjs/common';
import { GraphQLAuth } from '../auth/guard/GqlAuth.guard';
import { User } from '../user/user.entity';
import { Notification } from './notification.entity';
import { Comment } from '../comment/comment.entitiy';
import { constants } from '../../config/constants';
import { NotificationService } from './notification.service';
import { PubSub } from 'graphql-subscriptions';

@Resolver('Notification')
export class NotificationResolver {
	constructor(
		@Inject('PUB_SUB') private pubSub: PubSub,
		private readonly notificationService: NotificationService
	) {}

	@Subscription(() => Vote, {
		nullable: true
	})
	[constants.voteAdded]() {
		return this.pubSub.asyncIterator([constants.voteAdded]);
	}

	@Subscription(() => Comment, {
		nullable: true
	})
	[constants.commentAdded]() {
		return this.pubSub.asyncIterator([constants.commentAdded]);
	}

	@UseGuards(GraphQLAuth)
	@Mutation(() => Notification)
	async markNotificationAsSeen(
		@Args({ name: 'id', type: () => ID }) id: number
	): Promise<Notification> {
		return await this.notificationService.markNotificationAsSeen(id);
	}
}

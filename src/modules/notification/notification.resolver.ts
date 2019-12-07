import { Resolver, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from 'type-graphql';
import { Vote } from '../vote/vote.entity';
import { Inject, UseGuards } from '@nestjs/common';
import { GraphQLAuth } from '../auth/guard/GqlAuth.guard';
import { User } from '../user/user.entity';
import { Notification } from './notification.entity';
import { Comment } from '../comment/comment.entitiy';

@Resolver('Notification')
export class NotificationResolver {
	constructor(@Inject('PUB_SUB') private pubSub: PubSubEngine) {}

	@UseGuards(GraphQLAuth)
	@Subscription(returns => Vote, {
		nullable: true,
		filter: ({ voteAdded }, args, ctx) => {
			const { subscribers }: Notification = voteAdded;
			const subscribersIds: number[] = subscribers.map(({ id }: User) => id);
			const currentUser: User = ctx.req.user;
			return subscribersIds.includes(currentUser.id);
		}
	})
	voteAdded() {
		return this.pubSub.asyncIterator('voteAdded');
	}
	@UseGuards(GraphQLAuth)
	@Subscription(returns => Comment, {
		nullable: true,
		filter: ({ commentAdded }, args, ctx) => {
			const { subscribers }: Notification = commentAdded;
			const subscriberId: number = subscribers[0].id;
			const currentUser: User = ctx.req.user;
			return subscriberId === currentUser.id;
		}
	})
	commentAdded() {
		return this.pubSub.asyncIterator('commentAdded');
	}
}

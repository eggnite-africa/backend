/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ID } from 'type-graphql';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuth } from '../auth/guard/GqlAuth.guard';
import { Notification } from './notification.entity';
import { NotificationService } from './notification.service';

@Resolver('Notification')
export class NotificationResolver {
	constructor(private readonly notificationService: NotificationService) {}

	@UseGuards(GraphQLAuth)
	@Mutation(() => Notification)
	async markNotificationAsSeen(
		@Args({ name: 'id', type: () => ID }) id: number
	): Promise<Notification> {
		return await this.notificationService.markNotificationAsSeen(id);
	}
}

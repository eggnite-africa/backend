/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification, NotificationType } from './notification.entity';
import { Repository } from 'typeorm';
import { Vote } from '../vote/vote.entity';
import { Comment } from '../comment/comment.entitiy';
import { User } from '../user/user.entity';
import { constants } from '../../config/constants';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class NotificationService {
	constructor(
		@InjectRepository(Notification)
		private readonly notificationRepository: Repository<Notification>,
		@Inject('PUB_SUB') private pubSub: PubSub
	) {}

	async addNotification(subscribers: User[], vote?: Vote, comment?: Comment) {
		if (vote !== undefined && comment === undefined) {
			const { vote: voteNotification } = await this.addVoteNotification(
				vote,
				subscribers
			);
			await this.pubSub.publish(constants.voteAdded, {
				[constants.voteAdded]: voteNotification
			});
			return voteNotification;
		} else if (comment !== undefined && vote === undefined) {
			const subscriber: User = subscribers[0];
			const {
				comment: commentNotification
			} = await this.addCommentNotification(comment, subscriber);
			await this.pubSub.publish(constants.commentAdded, {
				[constants.commentAdded]: commentNotification
			});
			return commentNotification;
		}
	}

	private async addVoteNotification(
		{ id: voteId, userId }: Vote,
		subscribers: User[]
	) {
		const newNotification = new Notification();
		newNotification.type = NotificationType.VOTE;
		newNotification.userId = userId;
		newNotification.voteId = voteId;
		newNotification.subscribers = subscribers;
		await this.notificationRepository.save(newNotification);
		return await this.notificationRepository.findOneOrFail(
			{
				id: newNotification.id
			},
			{ relations: ['vote'] }
		);
	}

	private async addCommentNotification(
		{ id: commentId, userId }: Comment,
		subscriber: User
	) {
		const newNotification = new Notification();
		newNotification.type = NotificationType.COMMENT;
		newNotification.userId = userId;
		newNotification.commentId = commentId;
		newNotification.subscribers = [subscriber];
		await this.notificationRepository.save(newNotification);
		return await this.notificationRepository.findOneOrFail(
			{
				id: newNotification.id
			},
			{ relations: ['comment'] }
		);
	}

	async markNotificationAsSeen(id: number) {
		const notification = await this.notificationRepository.findOneOrFail(id);
		notification.seen = true;
		return await this.notificationRepository.save(notification);
	}
}

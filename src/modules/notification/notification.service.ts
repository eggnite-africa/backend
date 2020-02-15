/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification, NotificationType } from './notification.entity';
import { Repository } from 'typeorm';
import { Vote } from '../vote/vote.entity';
import { Comment } from '../comment/comment.entitiy';
import { User } from '../user/user.entity';

@Injectable()
export class NotificationService {
	constructor(
		@InjectRepository(Notification)
		private readonly notificationRepository: Repository<Notification>
	) {}

	async deleteAllUserNotifications(
		notifications: Notification[] | undefined
	): Promise<Notification[] | void> {
		if (notifications?.length)
			return await this.notificationRepository.remove(notifications);
	}

	async addVoteNotification({ id: voteId, userId }: Vote, subscribers: User[]) {
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

	async addCommentNotification(
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

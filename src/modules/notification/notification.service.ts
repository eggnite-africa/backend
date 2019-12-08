import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification, NotificationType } from './notification.entity';
import { Repository } from 'typeorm';
import { PubSubEngine } from 'type-graphql';
import { Vote } from '../vote/vote.entity';
import { Comment } from '../comment/comment.entitiy';
import { User } from '../user/user.entity';
import { constants } from '../../config/constants';

@Injectable()
export class NotificationService {
	constructor(
		@InjectRepository(Notification)
		private readonly notificationRepository: Repository<Notification>,
		@Inject('PUB_SUB') private pubSub: PubSubEngine
	) {}

	async addNotification(subscribers: User[], vote?: Vote, comment?: Comment) {
		if (vote !== undefined && comment === undefined) {
			const voteNotification = await this.addVoteNotification(
				vote,
				subscribers
			);
			await this.pubSub.publish(constants.voteAdded, {
				[constants.voteAdded]: voteNotification
			});
			return voteNotification;
		} else if (comment !== undefined && vote === undefined) {
			const subscriber: User = subscribers[0];
			const commentNotification = await this.addCommentNotification(
				comment,
				subscriber
			);
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
		return await this.notificationRepository.save(newNotification);
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
		return await this.notificationRepository.save(newNotification);
	}

	// async fetchAllNotifications(userId: number) {
	// 	const allNotifications = await this.notificationRepository.find({ userId });
	// 	if (allNotifications === undefined) {
	// 		throw new NotFoundException('There are no notifications.');
	// 	}
	// 	return allNotifications;
	// }

	// async fetchAllUnreadNotifications(userId: number) {
	// 	const [
	// 		allUnreadNotifications,
	// 		unreadCount
	// 	] = await this.notificationRepository.findAndCount({ userId, seen: false });
	// 	return {
	// 		notifications: allUnreadNotifications,
	// 		count: unreadCount
	// 	};
	// }

	async deleteNotification(notificationId: number) {}
}

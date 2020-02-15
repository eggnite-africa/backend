import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entitiy';
import { NotificationService } from '../notification/notification.service';
import { User } from '../user/user.entity';
import { Vote } from '../vote/vote.entity';

@Injectable()
export class CommentService {
	constructor(
		@InjectRepository(Comment)
		private readonly commentRepository: Repository<Comment>,
		private readonly notificationService: NotificationService
	) {}

	async fetchAllReplies(id: number): Promise<Comment[]> {
		return await this.commentRepository.find({
			where: {
				parentId: id
			}
		});
	}

	async fetchAllComments(id: number): Promise<Comment[]> {
		return await this.commentRepository.find({
			where: {
				productId: id,
				parentId: null
				// 👆 Here we only want to fetch the comments and not their replies
			}
		});
	}

	async fetchCommentById(id: number): Promise<Comment | undefined> {
		return await this.commentRepository.findOne(id);
	}

	private async filterSubscribers(
		userId: number,
		newComment: Comment
	): Promise<User[]> {
		const { product }: Comment = await this.commentRepository.findOneOrFail(
			{
				id: newComment.id
			},
			{
				relations: ['product', 'product.makers']
			}
		);
		const subscribers = product.makers.filter(
			(maker: User) => maker.id != userId
		);
		return subscribers;
	}

	async addComment(
		productId: number,
		content: string,
		userId: number,
		parentId?: number
	): Promise<Comment> {
		if (parentId) {
			return await this.addReply(parentId, content, userId, productId);
		}

		const newComment = new Comment();
		newComment.productId = productId;
		newComment.content = content;
		newComment.userId = userId;
		const addedComment = await this.commentRepository.save(newComment);
		const subscribers = await this.filterSubscribers(userId, newComment);
		await this.addCommentNotification(subscribers, newComment);
		return addedComment;
	}

	private async addCommentNotification(
		subscribers: User[],
		newComment: Comment
	): Promise<Comment | undefined> {
		const { comment } = await this.notificationService.addCommentNotification(
			newComment,
			subscribers[0]
		);
		return comment;
	}

	private async addReply(
		parentId: number,
		content: string,
		userId: number,
		productId: number
	): Promise<Comment> {
		const reply = new Comment();
		reply.parentId = parentId;
		reply.content = content;
		reply.userId = userId;
		reply.productId = productId;
		const newReply = await this.commentRepository.save(reply);
		const { parent } = await this.commentRepository.findOneOrFail(
			{ id: newReply.id },
			{
				relations: ['parent', 'parent.user']
			}
		);
		await this.addCommentNotification([parent.user], newReply);
		return newReply;
	}

	async deleteComment(id: number, userId: number): Promise<boolean> {
		const comment = await this.commentRepository.findOneOrFail(id);
		if (comment.replies) {
			const ids = comment.replies.map(r => r.id);
			await this.commentRepository.delete(ids);
		}
		await this.commentRepository.delete({ id, userId });
		const deleted = await this.fetchCommentById(id);
		return deleted === undefined ? true : false;
	}
	async updateComment(
		id: number,
		content: string,
		userId: number
	): Promise<Comment | undefined> {
		await this.commentRepository.update({ id, userId }, { content });
		return await this.fetchCommentById(id);
	}

	async deleteAllUserComments(
		userId: number,
		comments: Comment[] | undefined
	): Promise<void> {
		if (!comments?.length) return;
		const ids = comments.map(comment => comment.id);
		try {
			for (const id of ids) {
				await this.deleteComment(id, userId);
			}
		} catch (e) {
			new InternalServerErrorException(
				'There was a problem removing your comments'
			);
		}
	}
}

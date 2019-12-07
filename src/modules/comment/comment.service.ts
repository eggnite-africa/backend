import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entitiy';
import { NotificationService } from '../notification/notification.service';
import { User } from '../user/user.entity';

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

	async addComment(
		productId: number,
		content: string,
		userId: number,
		parentId?: number
	): Promise<Comment> {
		if (parentId) {
			return await this.addReply(parentId, content, userId);
		}

		const newComment = new Comment();
		newComment.productId = productId;
		newComment.content = content;
		newComment.userId = userId;
		const addedComment = await this.commentRepository.save(newComment);
		const { product } = await this.commentRepository.findOneOrFail(
			{
				id: newComment.id
			},
			{
				relations: ['product', 'product.makers']
			}
		);
		await this.addCommentNotification(product.makers, newComment);
		return addedComment;
	}

	private async addCommentNotification(
		subscribers: User[],
		newComment: Comment
	) {
		return await this.notificationService.addNotification(
			subscribers,
			undefined,
			newComment
		);
	}

	private async addReply(
		parentId: number,
		content: string,
		userId: number
	): Promise<Comment> {
		const reply = new Comment();
		reply.parentId = parentId;
		reply.content = content;
		reply.userId = userId;
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

	async deleteComment(id: number, userId: number): Promise<Boolean> {
		try {
			await this.commentRepository.delete({ id, userId });
			const deleted = await this.fetchCommentById(id);
			return deleted === undefined ? true : false;
		} catch (err) {
			throw err;
		}
	}
	async updateComment(
		id: number,
		content: string,
		userId: number
	): Promise<Comment | undefined> {
		try {
			await this.commentRepository.update({ id, userId }, { content });
			return await this.fetchCommentById(id);
		} catch (e) {}
	}
}

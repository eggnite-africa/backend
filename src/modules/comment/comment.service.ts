import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entitiy';

@Injectable()
export class CommentService {
	constructor(
		@InjectRepository(Comment)
		private readonly commentRepository: Repository<Comment>
	) {}

	async findAllReplies(id: number): Promise<Comment[]> {
		return await this.commentRepository.find({
			where: {
				parentId: id
			}
		});
	}

	async findAllComments(id: number): Promise<Comment[]> {
		return await this.commentRepository.find({
			where: {
				productId: id,
				parentId: null
				// 👆 Here we only want to fetch the comments and not their replies
			}
		});
	}

	async getCommentById(id: number): Promise<Comment | undefined> {
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

		const comment = new Comment();
		comment.productId = productId;
		comment.content = content;
		comment.userId = userId;

		return await this.commentRepository.save(comment);
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

		return await this.commentRepository.save(reply);
	}

	async deleteComment(id: number, userId: number): Promise<Boolean> {
		try {
			await this.commentRepository.delete({ id, userId });
			const deleted = await this.getCommentById(id);
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
			return await this.getCommentById(id);
		} catch (e) {}
	}
}

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

	async findAllReplies(id: number) {
		return await this.commentRepository.find({
			where: {
				parentId: id
			}
		});
	}

	async findAllComments(id: number) {
		return await this.commentRepository.find({
			where: {
				productId: id,
				parentId: null
				// 👆 Here we only want to fetch the comments and not their replies
			}
		});
	}

	async getCommentById(id: number) {
		return await this.commentRepository.findOne(id);
	}

	async addComment(
		productId: number,
		content: string,
		parentId: number = null
	) {
		if (parentId) {
			return await this.addReply(parentId, content);
		}

		const comment = new Comment();
		comment.productId = productId;
		comment.content = content;

		return await this.commentRepository.save(comment);
	}

	private async addReply(parentId: number, content: string) {
		const reply = new Comment();
		reply.parentId = parentId;
		reply.content = content;

		return await this.commentRepository.save(reply);
	}

	async deleteComment(id: number) {
		try {
			await this.commentRepository.delete({ id });
			const deleted = await this.getCommentById(id);
			return deleted === undefined ? true : false;
		} catch (err) {
			throw err;
		}
	}
	async updateComment(id: number, content: string) {
		try {
			await this.commentRepository.update({ id }, { content });
			return await this.getCommentById(id);
		} catch (e) {}
	}
}

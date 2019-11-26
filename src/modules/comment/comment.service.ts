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

	async findAll(options: any) {
		return await this.commentRepository.find({ ...options });
	}

	async getCommentById(id: number) {
		return await this.commentRepository.findOne(id);
	}

	async addComment(id: number, content: string) {
		const comment = new Comment();
		comment.productId = id;
		comment.content = content;

		return await this.commentRepository.save(comment);
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
			return await this.commentRepository.findOne(id);
		} catch (e) {}
	}
}

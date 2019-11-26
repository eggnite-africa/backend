import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Comment } from './comment.entitiy';
import { CommentService } from './comment.service';
import { ID } from 'type-graphql';
import { CommentInput } from './dto/comment.input';

@Resolver(of => Comment)
export class CommentResolver {
	constructor(private readonly commentService: CommentService) {}

	@Mutation(returns => Comment)
	async addComment(@Args('commentInput') { id, content }: CommentInput) {
		return await this.commentService.addComment(id, content);
	}

	@Mutation(returns => Boolean)
	async deleteComment(@Args({ name: 'id', type: () => ID }) commentId: number) {
		return await this.commentService.deleteComment(commentId);
	}

	@Mutation(returns => Comment)
	async updateComment(@Args('commentInput') { id, content }: CommentInput) {
		return await this.commentService.updateComment(id, content);
	}
}

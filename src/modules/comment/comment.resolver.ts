import {
	Resolver,
	Mutation,
	Args,
	ResolveProperty,
	Parent
} from '@nestjs/graphql';
import { Comment } from './comment.entitiy';
import { CommentService } from './comment.service';
import { ID } from 'type-graphql';
import { CommentInput } from './dto/comment.input';

@Resolver(of => Comment)
export class CommentResolver {
	constructor(private readonly commentService: CommentService) {}

	@Mutation(returns => Comment)
	async addComment(
		@Args('commentInput') { productId, content, parentId }: CommentInput
	) {
		return await this.commentService.addComment(productId, content, parentId);
	}

	@Mutation(returns => Boolean)
	async deleteComment(
		@Args({ name: 'commentId', type: () => ID }) commentId: number
	) {
		return await this.commentService.deleteComment(commentId);
	}

	@Mutation(returns => Comment)
	async updateComment(
		@Args('commentInput') { parentId, content }: CommentInput
	) {
		return await this.commentService.updateComment(parentId, content);
	}

	@ResolveProperty('replies')
	async replies(@Parent() Comment) {
		const { id } = Comment;
		return await this.commentService.findAllReplies(id);
	}
}

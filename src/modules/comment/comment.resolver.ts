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
import { UseGuards } from '@nestjs/common';
import { GraphQLAuth } from '../auth/guard/GqlAuth.guard';
import { CurrentUser } from '../user/decorator/user.decorator';
import { User } from '../user/user.entity';

@Resolver((of: any) => Comment)
export class CommentResolver {
	constructor(private readonly commentService: CommentService) {}

	@UseGuards(GraphQLAuth)
	@Mutation(returns => Comment)
	async addComment(
		@Args('commentInput') { productId, content, parentId }: CommentInput,
		@CurrentUser() { id: userId }: User
	): Promise<Comment | undefined> {
		return await this.commentService.addComment(
			productId,
			content,
			userId,
			parentId
		);
	}

	@UseGuards(GraphQLAuth)
	@Mutation(returns => Boolean)
	async deleteComment(
		@Args({ name: 'commentId', type: () => ID }) commentId: number,
		@CurrentUser() { id: userId }: User
	): Promise<boolean> {
		return await this.commentService.deleteComment(commentId, userId);
	}

	@UseGuards(GraphQLAuth)
	@Mutation(returns => Comment)
	async updateComment(
		@Args('commentInput') { parentId, content }: CommentInput,
		@CurrentUser() { id: userId }: User
	): Promise<Comment | undefined> {
		return await this.commentService.updateComment(parentId, content, userId);
	}

	@ResolveProperty('replies')
	async replies(@Parent() Comment: Comment): Promise<Comment[]> {
		const { id } = Comment;
		return await this.commentService.fetchAllReplies(id);
	}
}

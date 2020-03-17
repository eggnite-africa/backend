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

@Resolver(() => Comment)
export class CommentResolver {
	constructor(private readonly commentService: CommentService) {}

	// @UseGuards(GraphQLAuth)
	@Mutation(() => Comment)
	async addComment(
		@Args('commentInput')
		{ productId, pitchId, content, parentId }: CommentInput,
		@Args({ name: 'userId', type: () => ID }) userId: number
		// @CurrentUser() { id: userId }: Usùer
	): Promise<Comment | undefined> {
		return await this.commentService.addComment(
			userId,
			content,
			productId,
			pitchId,
			parentId
		);
	}

	@UseGuards(GraphQLAuth)
	@Mutation(() => Boolean)
	async deleteComment(
		@Args({ name: 'commentId', type: () => ID }) commentId: number,
		@CurrentUser() { id: userId }: User
	): Promise<boolean> {
		return await this.commentService.deleteComment(commentId, userId);
	}

	@UseGuards(GraphQLAuth)
	@Mutation(() => Comment)
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

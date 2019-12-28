import { InputType, Field, ID } from 'type-graphql';
import { Comment } from '../comment.entitiy';

@InputType()
export class CommentInput implements Partial<Comment> {
	// Because we're not always using all the fields,
	// We need to set some of them as nullable.
	@Field(() => ID, { nullable: true })
	productId!: number;

	@Field(() => String, { nullable: true })
	content!: string;

	@Field(() => ID, {
		nullable: true,
		description:
			"This refers to the comment id whether it's the parent or a standalone comment"
	})
	parentId!: number;
}

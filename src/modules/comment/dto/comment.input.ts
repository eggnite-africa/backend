import { InputType, Field, ID } from 'type-graphql';
import { Comment } from '../comment.entitiy';

@InputType()
export class CommentInput implements Partial<Comment> {
	@Field(type => ID)
	id: number;

	@Field(type => String)
	content: string;
}

import { Feedback, FeedbackType, FeedbackStatus } from '../feedback.entity';
import { InputType, Field } from 'type-graphql';

@InputType()
export class NewFeedbackInput implements Partial<Feedback> {
	@Field(() => FeedbackType)
	type!: FeedbackType;

	@Field(() => String)
	content!: string;

	@Field(() => FeedbackStatus)
	status: FeedbackStatus = FeedbackStatus.PENDING;
}

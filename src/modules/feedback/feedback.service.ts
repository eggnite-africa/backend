import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Feedback, FeedbackStatus } from './feedback.entity';
import { NewFeedbackInput } from './dto/newFeedback.input';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FeedbackService {
	constructor(
		@InjectRepository(Feedback)
		private readonly feedbackRepository: Repository<Feedback>
	) {}

	private async markAs(
		verb: string,
		id: number,
		reason = ''
	): Promise<Feedback> {
		const feedback = await this.feedbackRepository.findOneOrFail({ id });
		try {
			if (verb === FeedbackStatus.DONE) feedback.status = FeedbackStatus.DONE;
			else if (verb === FeedbackStatus.REFUSED) {
				feedback.status = FeedbackStatus.REFUSED;
				if (reason) feedback.note = reason;
			}
			return await this.feedbackRepository.save(feedback);
		} catch (e) {
			throw new InternalServerErrorException(
				`Couldn't mark feedback (${id}) as ${verb}`
			);
		}
	}

	async markAsDone(id: number): Promise<Feedback> {
		return await this.markAs(FeedbackStatus.DONE, id);
	}
	async markAsRefused(id: number, reason: string): Promise<Feedback> {
		return await this.markAs(FeedbackStatus.REFUSED, id, reason);
	}
	async addFeedback(
		userId: number,
		{ type, content, status }: NewFeedbackInput
	): Promise<Feedback> {
		const newFeedback = new Feedback();
		newFeedback.userId = userId;
		newFeedback.type = type;
		newFeedback.content = content;
		newFeedback.status = status;
		return await this.feedbackRepository.save(newFeedback);
	}
	async fetchFeedbackByUserId(userId: number): Promise<Feedback[]> {
		return this.feedbackRepository.find({ userId });
	}
	async fetchAllFeedback(): Promise<Feedback[]> {
		return this.feedbackRepository.find();
	}
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vote } from './vote.entity';
import { Repository } from 'typeorm';
import { NotificationService } from '../notification/notification.service';
import { User } from '../user/user.entity';

@Injectable()
export class VoteService {
	constructor(
		@InjectRepository(Vote) private readonly voteRepository: Repository<Vote>,
		private readonly notificationService: NotificationService
	) {}

	async deleteAllUserVotes(userVotes: Vote[] | undefined): Promise<void> {
		if (userVotes?.length) {
			const ids = userVotes.map(vote => vote.id);
			await this.voteRepository.delete(ids);
		}
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async fetchAllVotes(options: any): Promise<Vote[]> {
		return await this.voteRepository.find(options);
	}

	async addVote(productId: number, userId: number): Promise<Vote> {
		const alreadyVoted = await this.voteRepository.findOne({
			where: {
				productId,
				userId
			}
		});

		if (alreadyVoted && alreadyVoted !== undefined) {
			throw new Error("You already voted. Can't vote twice.");
		}

		const newVote = new Vote();
		newVote.productId = productId;
		newVote.userId = userId;
		const addedVote = await this.voteRepository.save(newVote);
		const { product }: Vote = await this.voteRepository.findOneOrFail(
			{ id: addedVote.id },
			{
				relations: ['product', 'product.makers']
			}
		);
		const subscribers = product.makers.filter(
			(maker: User) => maker.id != userId
		);
		await this.notificationService.addNotification(subscribers, newVote);
		return addedVote;
	}

	async deleteVote(productId: number, userId: number): Promise<boolean> {
		const voteToRemove = await this.voteRepository.findOneOrFail({
			where: {
				productId,
				userId
			}
		});
		const isDeleted = await this.voteRepository.remove(voteToRemove);
		return isDeleted ? true : false;
	}
}

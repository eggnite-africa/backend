import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vote } from './vote.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VoteService {
	constructor(
		@InjectRepository(Vote) private readonly voteRepository: Repository<Vote>
	) {}

	async findAll(options: any) {
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
		return await this.voteRepository.save(newVote);
	}

	async removeVote(productId: number, userId: number): Promise<Boolean> {
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

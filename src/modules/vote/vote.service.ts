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

	async addVote(productId: number, voterId: number = 1) {
		const alreadyVoted = await this.voteRepository.findOne({
			where: {
				productId,
				voterId
			}
		});

		if (alreadyVoted && alreadyVoted !== undefined) {
			throw new Error("You already voted. Can't vote twice.");
		}

		const newVote = new Vote();
		newVote.productId = productId;
		newVote.voterId = voterId;
		return await this.voteRepository.save(newVote);
	}

	async removeVote(productId: number, voterId: number) {
		const voteToRemove = await this.voteRepository.findOneOrFail({
			where: {
				productId,
				voterId
			}
		});
		const isDeleted = await this.voteRepository.remove(voteToRemove);
		return isDeleted ? true : false;
	}
}

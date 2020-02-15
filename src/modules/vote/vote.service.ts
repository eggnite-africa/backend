import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vote } from './vote.entity';
import { Repository } from 'typeorm';
import { NotificationService } from '../notification/notification.service';
import { User, userTypeEnum } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { ProductService } from '../product/product.service';

@Injectable()
export class VoteService {
	constructor(
		@InjectRepository(Vote) private readonly voteRepository: Repository<Vote>,
		private readonly notificationService: NotificationService,
		@Inject(forwardRef(() => UserService))
		private readonly userService: UserService,
		@Inject(forwardRef(() => ProductService))
		private readonly productService: ProductService
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

	private async blackBox(userId: number): Promise<number> {
		let score = 0;
		const { type, products } = await this.userService.fetchUserById(userId);
		if (type === userTypeEnum.MAKER) {
			score += 1.25;
			if (products?.length && products.length > 1)
				score += 0.25 * products.length;
		} else if (type === userTypeEnum.USER) {
			score += 0.5;
		} else if (type === userTypeEnum.ADMIN) {
			score += 5;
		}
		return score;
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
		const score = await this.blackBox(userId);
		Promise.all([
			await this.notificationService.addVoteNotification(newVote, subscribers),
			await this.productService.modifyScore(productId, score)
		]);
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
		const score = (await this.blackBox(userId)) * -1;
		await this.productService.modifyScore(productId, score);
		return isDeleted ? true : false;
	}
}

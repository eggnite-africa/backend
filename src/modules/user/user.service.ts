import {
	Injectable,
	InternalServerErrorException,
	forwardRef,
	Inject
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { Product } from '../product/product.entity';
import { ProductService } from '../product/product.service';
import { UserInput } from './dto/user.input';
import { SharedService } from '../shared/shared.service';
import { ProfileService } from '../profile/profile.service';
import { VoteService } from '../vote/vote.service';
import { Notification } from '../notification/notification.entity';
import { Profile } from '../profile/profile.entity';
import { Vote } from '../vote/vote.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>,
		@Inject(forwardRef(() => ProductService))
		private readonly productService: ProductService,
		private readonly sharedService: SharedService,
		private readonly profileService: ProfileService,
		private readonly voteService: VoteService
	) {}

	async saveUser(user: User): Promise<User> {
		return await this.userRepository.save(user);
	}

	async fetchAllUsers(): Promise<User[]> {
		return await this.userRepository.find();
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async findUserByOptions(options: any = {}): Promise<User> {
		return await this.userRepository.findOneOrFail({
			where: { ...options },
			relations: ['products', 'comments']
		});
	}

	async fetchMakersByIds(makersIds: number[]): Promise<User[]> {
		return await this.userRepository.findByIds(makersIds);
	}

	async fetchUserByUsername(username: string): Promise<User> {
		return await this.findUserByOptions({ username });
	}

	async fetchUserById(id: number): Promise<User> {
		return await this.findUserByOptions({ id });
	}

	async addUser(newUser: UserInput): Promise<User> {
		// eslint-disable-next-line require-atomic-updates
		newUser.password = await this.sharedService.hashPassword(newUser.password);
		// eslint-disable-next-line require-atomic-updates
		newUser.profile = await this.profileService.addUserProfile(newUser.profile);
		const addedUser = await this.userRepository.save(newUser);
		return await this.userRepository.findOneOrFail(
			{ id: addedUser.id },
			{ relations: ['profile'] }
		);
	}

	/**
	 * Fetchs products that have only this (one) user as a maker
	 */
	async fetchProductsByMakerId(userId: number): Promise<Product[] | []> {
		const { products } = await this.findUserByOptions({
			where: { id: userId },
			relations: ['products', 'products.makers']
		});
		if (!products?.length) {
			return [];
		}
		// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
		const filterProducts = (products: Product[] | undefined) => {
			const filteredProducts: Product[] = [];
			// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
			products?.forEach(product => {
				const makersIds: number[] = [];
				product.makers.forEach(maker => makersIds.push(maker.id));
				if (makersIds.every(id => id === userId)) {
					filteredProducts.push(product);
				} else {
					this.productService.deleteMaker(product.id, userId);
				}
			});
			return filteredProducts;
		};
		const filteredProducts: Product[] = filterProducts(products);
		return filteredProducts;
	}

	async deleteUser(id: number): Promise<boolean> {
		const user = await this.fetchUserById(id);
		const userProducts = await this.fetchProductsByMakerId(id);
		if (userProducts?.length) {
			const deletedProducts = await this.productService.deleteUserProducts(
				userProducts
			);
			if (!deletedProducts) {
				throw new InternalServerErrorException();
			}
		}
		await this.userRepository.remove(user);
		return true;
	}

	async fetchAllNotificationsByUserId(
		id: number
	): Promise<Notification[] | undefined> {
		const { notifications }: User = await this.userRepository.findOneOrFail(
			{ id },
			{
				relations: [
					'notifications',
					'notifications.vote',
					'notifications.comment'
				],
				cache: true
			}
		);
		return notifications;
	}

	async fetchAllUnreadNotificationsByUserId(
		id: number
	): Promise<Notification[] | undefined> {
		const notifications:
			| Notification[]
			| undefined = await this.fetchAllNotificationsByUserId(id);
		return notifications?.filter(
			// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
			(notification: Notification) => notification.seen === false
		);
	}

	async fetchProfileByUserId(id: number): Promise<Profile> {
		const { profile }: User = await this.userRepository.findOneOrFail(
			{ id },
			{
				relations: ['profile']
			}
		);
		return profile;
	}

	async fetchVotesByUserId(id: number): Promise<Vote[]> {
		return await this.voteService.fetchAllVotes({ where: { userId: id } });
	}
}

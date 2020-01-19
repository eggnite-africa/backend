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

	async deleteUser(id: number): Promise<boolean> {
		const user = await this.userRepository.findOneOrFail({
			where: { id },
			relations: ['products', 'products.makers']
		});

		const userProducts = user.products || [];

		Promise.all([
			await this.productService.deleteUserProducts(userProducts, user)
		]);

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

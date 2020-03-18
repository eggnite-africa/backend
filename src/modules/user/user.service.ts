import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, userTypeEnum } from './user.entity';
import { Repository } from 'typeorm';
import { ProductService } from '../product/product.service';
import { NewUserInput } from './dto/newUser.input';
import { SharedService } from '../shared/shared.service';
import { ProfileService } from '../profile/profile.service';
import { VoteService } from '../vote/vote.service';
import { Notification } from '../notification/notification.entity';
import { Profile } from '../profile/profile.entity';
import { Vote } from '../vote/vote.entity';
import { CommentService } from '../comment/comment.service';
import { NotificationService } from '../notification/notification.service';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>,
		@Inject(forwardRef(() => ProductService))
		private readonly productService: ProductService,
		private readonly sharedService: SharedService,
		private readonly profileService: ProfileService,
		private readonly voteService: VoteService,
		private readonly commentService: CommentService,
		private readonly notificationService: NotificationService
	) {}

	async saveUser(user: User): Promise<User> {
		return await this.userRepository.save(user);
	}

	async fetchAllUsers(): Promise<User[]> {
		return await this.userRepository.find({
			relations: ['products', 'comments']
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async findUserByOptions(options: any = {}): Promise<User> {
		return await this.userRepository.findOneOrFail({
			where: { ...options },
			relations: ['products', 'comments', 'pitch']
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

	async addUser(newUser: NewUserInput): Promise<User> {
		const [password, profile] = await Promise.all([
			await this.sharedService.hashPassword(newUser.password),
			await this.profileService.addUserProfile(newUser.profile)
		]);
		newUser.password = password;
		newUser.profile = profile;
		const addedUser = await this.userRepository.save(newUser);
		return await this.userRepository.findOneOrFail(
			{ id: addedUser.id },
			{ relations: ['profile'] }
		);
	}

	async deleteUser(id: number): Promise<boolean> {
		const user = await this.userRepository.findOneOrFail({
			where: { id },
			relations: ['products', 'products.makers', 'comments', 'notifications']
		});
		user.votes = await this.voteService.fetchAllVotes({ userId: id });
		try {
			if (user.products) {
				await this.productService.deleteUserProducts(user.products, user);
			}
			if (user.comments) {
				await this.commentService.deleteAllUserComments(id, user.comments);
			}
			if (user.votes) {
				await this.voteService.deleteAllUserVotes(user.votes);
			}
			if (user.notifications) {
				await this.notificationService.deleteAllUserNotifications(
					user.notifications
				);
			}
			await this.userRepository.save(user);
			await this.userRepository.remove(user);
			await this.profileService.deleteProfile(user.profileId);
		} catch (e) {
			await this.userRepository.remove(user);
			await this.profileService.deleteProfile(user.profileId);
		}
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

	async checkUsernameExistance(username: string): Promise<boolean> {
		try {
			await this.userRepository.findOneOrFail({
				where: { username },
				select: ['username']
			});
			return true;
		} catch (e) {
			return false;
		}
	}

	async checkEmailExistance(email: string): Promise<boolean> {
		try {
			await this.userRepository.findOneOrFail({
				where: { email },
				select: ['email']
			});
			return true;
		} catch (e) {
			return false;
		}
	}

	private async changeUserType(
		user: User,
		newType: userTypeEnum
	): Promise<User | undefined> {
		if (user.type === newType || user.type === userTypeEnum.ADMIN) return;
		user.type = newType;
		return await this.userRepository.save(user);
	}

	async setUserAsMaker(id: number): Promise<User | undefined> {
		const user = await this.userRepository.findOneOrFail({
			where: { id },
			relations: ['products']
		});
		if (user.products?.length) return;
		return await this.changeUserType(user, userTypeEnum.MAKER);
	}

	async setUserAsNormal(id: number): Promise<User | undefined> {
		const user = await this.userRepository.findOneOrFail({
			where: { id },
			relations: ['products']
		});
		if (!user.products?.length) return;
		return await this.changeUserType(user, userTypeEnum.USER);
	}
}

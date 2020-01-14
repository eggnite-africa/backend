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

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>,
		@Inject(forwardRef(() => ProductService))
		private readonly productService: ProductService,
		private readonly sharedService: SharedService,
		private readonly profileService: ProfileService
	) {}

	async saveUser(user: User) {
		return await this.userRepository.save(user);
	}

	async fetchAllUsers(): Promise<User[]> {
		return await this.userRepository.find();
	}

	async findUserByOptions(options: any = {}): Promise<User> {
		return await this.userRepository.findOneOrFail(options);
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
	 * Fetchs products made by this user only
	 */
	async fetchMakerProductsById(userId: number): Promise<Product[] | []> {
		const { products } = await this.findUserByOptions({
			where: { id: userId },
			relations: ['products', 'products.makers']
		});
		if (!products?.length) {
			return [];
		}
		const filterProducts = (products: Product[] | undefined) => {
			const filteredProducts: Product[] = [];
			products?.forEach(product => {
				const makersIds: number[] = [];
				product.makers.forEach(maker => makersIds.push(maker.id));
				if (makersIds.every(id => id === userId)) {
					filteredProducts.push(product);
				}
			});
			return filteredProducts;
		};
		const filteredProducts: Product[] = filterProducts(products);
		return filteredProducts;
	}

	async deleteUser(username: string): Promise<boolean> {
		const user = await this.fetchUserByUsername(username);
		const userProducts = await this.fetchMakerProductsById(user.id);
		if (userProducts?.length) {
			const deletedProducts = await this.productService.deleteUserProducts(
				userProducts
			);
			if (!deletedProducts) {
				throw new InternalServerErrorException(
					`${username}'s products could not be removed`
				);
			}
		}
		await this.userRepository.remove(user);
		return true;
	}

	async fetchAllNotificationsByUserId(id: number) {
		const { notifications }: User = await this.userRepository.findOneOrFail(
			{ id },
			{
				relations: ['notifications']
			}
		);
		return notifications;
	}

	async fetchAllUnreadNotificationsByUserId(id: number) {
		const { notifications }: User = await this.userRepository.findOneOrFail({
			where: {
				id,
				notifications: {
					seen: false
				}
			},
			relations: ['notifications']
		});
		return notifications;
	}

	async fetchProfileByUserId(id: number) {
		const { profile }: User = await this.userRepository.findOneOrFail(
			{ id },
			{
				relations: ['profile']
			}
		);
		return profile;
	}
}

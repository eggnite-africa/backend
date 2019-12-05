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

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>,
		@Inject(forwardRef(() => ProductService))
		private readonly productService: ProductService
	) {}

	async saveUser(user: User) {
		return await this.userRepository.save(user);
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

	async addUser(newUser: UserInput): Promise<User> {
		const upash = require('upash');
		upash.install('argon2', require('@phc/argon2'));
		newUser.password = await upash.hash(newUser.password);
		return await this.userRepository.save(newUser);
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

	async deleteUser(username: string): Promise<Boolean> {
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
}

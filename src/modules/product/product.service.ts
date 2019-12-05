import {
	Injectable,
	NotFoundException,
	InternalServerErrorException,
	Inject,
	forwardRef,
	UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { updatedProductInput } from './dto/updatedProduct.input';
import { newProductInput } from './dto/newProduct.input';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(Product)
		private readonly productRepository: Repository<Product>,
		@Inject(forwardRef(() => UserService))
		private readonly userService: UserService
	) {}

	async fetchAllProducts(options: any = {}): Promise<Product[]> {
		return await this.productRepository.find(options);
	}

	async fetchProductById(id: number): Promise<Product> {
		return await this.productRepository.findOneOrFail({ id });
	}

	async fetchMakersByProductId(productId: number): Promise<User[]> {
		const product: Product = await this.productRepository.findOneOrFail({
			where: {
				id: productId
			},
			relations: ['makers']
		});
		const makers: User[] = product.makers;
		return makers;
	}

	async fetchMakersByIds(makersIds: number[] | undefined): Promise<User[]> {
		let makers: User[] = [];
		if (makersIds !== undefined) {
			makers = await this.userService.fetchMakersByIds(makersIds);
		}
		if (makersIds !== undefined && !makers.length) {
			throw new NotFoundException('There was a problem processing makers');
		}
		return makers;
	}

	async addProduct(product: newProductInput): Promise<Product> {
		const makersIds = product.makersIds;
		const makers = await this.fetchMakersByIds(makersIds);

		const newProduct = new Product();
		newProduct.name = product.name;
		newProduct.tagline = product.tagline;
		newProduct.description = product?.description;
		newProduct.links = product.links;
		newProduct.media = product.media;
		newProduct.makers = makers;
		return await this.productRepository.save(newProduct);
	}

	async updateProduct(
		id: number,
		updatedProduct: updatedProductInput
	): Promise<Product | undefined> {
		await this.productRepository.update({ id }, { ...updatedProduct });
		return await this.fetchProductById(id);
	}

	async addMaker(productId: number, makerId: number) {
		const maker: User[] = await this.fetchMakersByIds([makerId]);
		const product = await this.productRepository.findOneOrFail({
			where: {
				id: productId
			},
			relations: ['makers']
		});
		product.makers.push(maker[0]);
		return await this.productRepository.save(product);
	}

	async deleteMaker(productId: number, makerId: number, userId: number) {
		const maker: User[] = await this.fetchMakersByIds([makerId]);
		const product = await this.productRepository.findOneOrFail({
			where: {
				id: productId
			},
			relations: ['makers']
		});
		const numberOfMakers = product.makers.length;
		if (numberOfMakers === 1) {
			throw new UnauthorizedException('Please delete the product instead');
		}
		product.makers = product.makers.filter(
			({ id }: User) => id !== maker[0].id
		);
		return await this.productRepository.save(product);
	}

	async deleteProduct(id: number): Promise<Boolean> {
		const product = await this.fetchProductById(id);
		if (product) {
			await this.productRepository.remove(product);
		}
		const isDeleted = !(await this.fetchProductById(id));
		return isDeleted;
	}

	async deleteUserProducts(products: Product[]) {
		const deletedProducts = await this.productRepository.remove(products);
		if (!deletedProducts.length) {
			throw new InternalServerErrorException();
		}
		return true;
	}
}

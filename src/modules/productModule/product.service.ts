import { Injectable, NotFoundException } from '@nestjs/common';
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
		private readonly userService: UserService
	) {}

	async findAll(): Promise<Product[]> {
		return await this.productRepository.find();
	}

	async findOne(id: number): Promise<Product | undefined> {
		return await this.productRepository.findOneOrFail({ id });
	}

	async create(product: newProductInput): Promise<Product> {
		const fetchMakersByIds = async (makersIds: number[]) => {
			return await this.userService.fetchMakers(makersIds);
		};
		const makers: User[] = await fetchMakersByIds(product.makersIds);

		if (!makers.length) {
			throw new NotFoundException('There was a problem processing makers');
		}

		const newProduct = new Product();
		newProduct.name = product.name;
		newProduct.tagline = product.tagline;
		newProduct.description = product?.description;
		newProduct.links = product.links;
		newProduct.media = product.media;
		newProduct.makersIds = product.makersIds;
		newProduct.makers = makers;
		return await this.productRepository.save(newProduct);
	}

	async update(
		id: number,
		updatedProuduct: updatedProductInput
	): Promise<Product> {
		await this.productRepository.update({ id }, { ...updatedProuduct });
		const updatedProduct = await this.productRepository.findOneOrFail(id);
		return updatedProduct;
	}

	async delete(id: number): Promise<Boolean> {
		const product = await this.findOne(id);
		if (product) {
			await this.productRepository.remove(product);
		}
		const isDeleted = !(await this.productRepository.findOne(id));
		return isDeleted;
	}
}

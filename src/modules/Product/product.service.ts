import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { updatedProductInput } from './dto/updatedProduct.input';

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(Product)
		private readonly productRepository: Repository<Product>
	) {}

	async findAll(): Promise<Product[]> {
		return await this.productRepository.find();
	}

	async findOne(id: string): Promise<Product | undefined> {
		return await this.productRepository.findOneOrFail({ id });
	}

	async create(product): Promise<Product> {
		return await this.productRepository.save(product);
	}

	async update(
		id: string,
		updatedProuduct: updatedProductInput
	): Promise<Product> {
		await this.productRepository.update({ id }, { ...updatedProuduct });
		const updatedProduct = await this.productRepository.findOneOrFail(id);
		return updatedProduct;
	}

	async delete(id: string): Promise<Boolean> {
		const product = await this.productRepository.findOneOrFail(id);
		await this.productRepository.remove(product);
		const isDeleted = !(await this.productRepository.findOne(id));
		return isDeleted;
	}
}

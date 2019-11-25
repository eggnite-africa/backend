import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { newProductInput } from './dto/newProduct.input';
import { updatedProductInput } from './dto/updatedProduct.input';
import { ID } from 'type-graphql';

@Resolver(of => Product)
export class ProductResolver {
	constructor(private readonly productService: ProductService) {}

	@Query(returns => [Product])
	async products(): Promise<Product[]> {
		return await this.productService.findAll();
	}

	@Query(returns => Product)
	async product(
		@Args({ name: 'id', type: () => ID }) id: string
	): Promise<Product | undefined> {
		return await this.productService.findOne(id);
	}

	@Mutation(returns => Product)
	async create(
		@Args('newProduct') newProduct: newProductInput
	): Promise<Product> {
		return await this.productService.create(newProduct);
	}

	@Mutation(returns => Product)
	async update(
		@Args('updatedProduct') updatedProuduct: updatedProductInput
	): Promise<Product> {
		return await this.productService.update(
			updatedProuduct.id,
			updatedProuduct
		);
	}

	@Mutation(returns => Boolean)
	async delete(
		@Args({ name: 'id', type: () => ID }) id: string
	): Promise<Boolean> {
		return await this.productService.delete(id);
	}
}

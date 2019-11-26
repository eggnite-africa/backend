import {
	Resolver,
	Query,
	Mutation,
	Args,
	ResolveProperty,
	Parent
} from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { newProductInput } from './dto/newProduct.input';
import { updatedProductInput } from './dto/updatedProduct.input';
import { ID } from 'type-graphql';
import { VoteService } from '../vote/vote.service';
import { CommentService } from '../comment/comment.service';

@Resolver(of => Product)
export class ProductResolver {
	constructor(
		private readonly productService: ProductService,
		private readonly voteService: VoteService,
		private readonly commentService: CommentService
	) {}

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

	@ResolveProperty('votes')
	async votes(@Parent() product) {
		const { id } = product;
		return await this.voteService.findAll({ productId: id });
	}

	@ResolveProperty('comments')
	async comments(@Parent() product) {
		const { id } = product;
		return await this.commentService.findAll({ productId: id });
	}
}

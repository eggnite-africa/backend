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
import { Comment } from '../comment/comment.entitiy';
import { Vote } from '../vote/vote.entity';
import { CurrentUser } from '../user/decorator/user.decorator';
import { User } from '../user/user.entity';
import {
	UnauthorizedException,
	NotFoundException,
	UseGuards
} from '@nestjs/common';
import { GraphQLAuth } from '../auth/guard/GqlAuth.guard';

@Resolver((of: any) => Product)
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
		@Args({ name: 'id', type: () => ID }) id: number
	): Promise<Product | undefined> {
		return await this.productService.findOne(id);
	}

	@Mutation(returns => Product)
	@UseGuards(GraphQLAuth)
	async addProduct(
		@Args('newProduct') newProduct: newProductInput
	): Promise<Product> {
		return await this.productService.create(newProduct);
	}

	private async checkOwnership(
		ownerId: number | undefined,
		productId: number | undefined
	) {
		if (ownerId && productId) {
			const product: Product | undefined = await this.productService.findOne(
				productId
			);
			const isOwner = product?.makersIds.some(id => id == ownerId);
			if (!isOwner) {
				throw new UnauthorizedException("You can't alter what's not yours");
			}
		} else {
			throw new NotFoundException('Please check your input');
		}
	}

	@Mutation(returns => Product)
	@UseGuards(GraphQLAuth)
	async updateProduct(
		@Args('updatedProduct') updatedProuduct: updatedProductInput,
		@CurrentUser() { id: userId }: User
	): Promise<Product> {
		const { id: productId } = updatedProuduct;
		await this.checkOwnership(userId, productId);

		return await this.productService.update(productId, updatedProuduct);
	}

	@Mutation(returns => Boolean)
	@UseGuards(GraphQLAuth)
	async deleteProduct(
		@Args({ name: 'id', type: () => ID }) id: number,
		@CurrentUser() { id: userId }: User
	): Promise<Boolean> {
		const product: Product | undefined = await this.productService.findOne(id);
		const productId = product?.id;
		await this.checkOwnership(userId, productId);
		return await this.productService.delete(id);
	}

	@ResolveProperty('votes')
	async votes(@Parent() product: Product): Promise<Vote[]> {
		const { id } = product;
		return await this.voteService.findAll({ productId: id });
	}

	@ResolveProperty('comments')
	async comments(@Parent() product: Product): Promise<Comment[]> {
		const { id } = product;
		return await this.commentService.findAllComments(id);
	}
}

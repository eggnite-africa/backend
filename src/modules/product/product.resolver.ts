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
import { MakerInput } from './dto/maker.input';

@Resolver((of: any) => Product)
export class ProductResolver {
	constructor(
		private readonly productService: ProductService,
		private readonly voteService: VoteService,
		private readonly commentService: CommentService
	) {}

	@Query(returns => [Product])
	async products(): Promise<Product[]> {
		return await this.productService.fetchAllProducts();
	}

	@Query(returns => Product)
	async product(
		@Args({ name: 'id', type: () => ID }) id: number
	): Promise<Product | undefined> {
		return await this.productService.fetchProductById(id);
	}

	@Mutation(returns => Product)
	@UseGuards(GraphQLAuth)
	async addProduct(
		@Args('newProduct') newProduct: newProductInput,
		@CurrentUser() { id: userId }: User
	): Promise<Product> {
		return await this.productService.addProduct(newProduct, userId);
	}

	private async checkOwnership(
		ownerId: number | undefined,
		productId: number | undefined
	) {
		if (ownerId && productId) {
			const makers = await this.productService.fetchMakersByProductId(
				productId
			);
			const makersIds: number[] | undefined = makers?.map(user => user.id);
			const isOwner = makersIds?.some(id => id == ownerId);
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
	): Promise<Product | undefined> {
		const { id: productId } = updatedProuduct;
		await this.checkOwnership(userId, productId);

		return await this.productService.updateProduct(productId, updatedProuduct);
	}

	@Mutation(returns => Product)
	@UseGuards(GraphQLAuth)
	async addMaker(
		@Args('makerInput') { makerId, productId }: MakerInput,
		@CurrentUser() { id: userId }: User
	): Promise<Product> {
		await this.checkOwnership(userId, productId);
		return await this.productService.addMaker(productId, makerId);
	}

	@Mutation(returns => Product)
	@UseGuards(GraphQLAuth)
	async deleteMaker(
		@Args('makerInput') { makerId, productId }: MakerInput,
		@CurrentUser() { id: userId }: User
	): Promise<Product> {
		await this.checkOwnership(userId, productId);
		return await this.productService.deleteMaker(productId, makerId, userId);
	}

	@Mutation(returns => Boolean)
	@UseGuards(GraphQLAuth)
	async deleteProduct(
		@Args({ name: 'id', type: () => ID }) id: number,
		@CurrentUser() { id: userId }: User
	): Promise<boolean> {
		const product:
			| Product
			| undefined = await this.productService.fetchProductById(id);
		const productId = product?.id;
		await this.checkOwnership(userId, productId);
		return await this.productService.deleteProduct(id);
	}

	@Mutation(() => Boolean)
	@UseGuards(GraphQLAuth)
	async checkProductExistance(
		@Args({ name: 'productName', type: () => String }) productName: string
	): Promise<boolean> {
		return await this.productService.checkProductExistance(productName);
	}

	@ResolveProperty('votes')
	async votes(@Parent() product: Product): Promise<Vote[]> {
		const { id } = product;
		return await this.voteService.fetchAllVotes({ productId: id });
	}

	@ResolveProperty('comments')
	async comments(@Parent() product: Product): Promise<Comment[]> {
		const { id } = product;
		return await this.commentService.fetchAllComments(id);
	}

	@ResolveProperty('makers')
	async makers(@Parent() product: Product): Promise<User[]> {
		const { id } = product;
		return await this.productService.fetchMakersByProductId(id);
	}
}

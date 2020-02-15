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
import { NewProductInput } from './dto/newProduct.input';
import { UpdatedProductInput } from './dto/updatedProduct.input';
import { ID, Int } from 'type-graphql';
import { VoteService } from '../vote/vote.service';
import { CommentService } from '../comment/comment.service';
import { Comment } from '../comment/comment.entitiy';
import { Vote } from '../vote/vote.entity';
import { CurrentUser } from '../user/decorator/user.decorator';
import { User } from '../user/user.entity';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuth } from '../auth/guard/GqlAuth.guard';
import { MakerInput } from './dto/maker.input';
import { Products } from './type/products.type';

@Resolver(() => Product)
export class ProductResolver {
	constructor(
		private readonly productService: ProductService,
		private readonly voteService: VoteService,
		private readonly commentService: CommentService
	) {}

	@Query(() => Products)
	async productsList(
		@Args({ name: 'page', type: () => Int }) page: number,
		@Args({ name: 'pageSize', type: () => Int, defaultValue: 7 })
		pageSize: number
	): Promise<Products> {
		const start = page * pageSize;
		const end = start + pageSize;
		const products = await this.productService.fetchAllProducts();
		return {
			products: products.slice(start, end),
			hasMore: end < products.length
		};
	}

	@Query(() => Product)
	async product(
		@Args({ name: 'id', type: () => ID, nullable: true }) id: number,
		@Args({ name: 'name', type: () => String, nullable: true }) name: string
	): Promise<Product | undefined> {
		if (id) {
			return await this.productService.fetchProductById(id);
		} else {
			return await this.productService.fetchProductByName(name);
		}
	}

	@Query(() => [Product], { nullable: 'itemsAndList' })
	async searchProducts(
		@Args({ name: 'query', type: () => String }) query: string
	): Promise<Product[] | []> {
		return await this.productService.searchProducts(query);
	}

	@Query(() => Boolean)
	@UseGuards(GraphQLAuth)
	async checkProductExistance(
		@Args({ name: 'productName', type: () => String }) productName: string
	): Promise<boolean> {
		return await this.productService.checkProductExistance(productName);
	}

	@Mutation(() => Product)
	@UseGuards(GraphQLAuth)
	async addProduct(
		@Args('newProduct') newProduct: NewProductInput,
		@CurrentUser() { id: userId }: User
	): Promise<Product> {
		return await this.productService.addProduct(newProduct, userId);
	}

	@Mutation(() => Product)
	@UseGuards(GraphQLAuth)
	async updateProduct(
		@Args('updatedProduct') updatedProuduct: UpdatedProductInput,
		@CurrentUser() { id: userId }: User
	): Promise<Product | undefined> {
		const { id: productId } = updatedProuduct;
		await this.productService.checkOwnership(userId, productId);
		return await this.productService.updateProduct(productId, updatedProuduct);
	}

	@Mutation(() => Product)
	@UseGuards(GraphQLAuth)
	async addMaker(
		@Args('makerInput') { makerId, productId }: MakerInput,
		@CurrentUser() { id: userId }: User
	): Promise<Product> {
		await this.productService.checkOwnership(userId, productId);
		return await this.productService.addMaker(productId, makerId);
	}

	@Mutation(() => Product)
	@UseGuards(GraphQLAuth)
	async deleteMaker(
		@Args('makerInput') { makerId, productId }: MakerInput,
		@CurrentUser() { id: userId }: User
	): Promise<Product> {
		await this.productService.checkOwnership(userId, productId);
		return await this.productService.deleteMaker(productId, makerId);
	}

	@Mutation(() => Boolean)
	@UseGuards(GraphQLAuth)
	async deleteProduct(
		@Args({ name: 'id', type: () => ID }) id: number,
		@CurrentUser() { id: userId }: User
	): Promise<boolean> {
		const product:
			| Product
			| undefined = await this.productService.fetchProductById(id);
		const productId = product?.id;
		await this.productService.checkOwnership(userId, productId);
		return await this.productService.deleteProduct(id);
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

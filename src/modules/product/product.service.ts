import {
	Injectable,
	NotFoundException,
	Inject,
	forwardRef,
	UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository, Like } from 'typeorm';
import { UpdatedProductInput } from './dto/updatedProduct.input';
import { NewProductInput } from './dto/newProduct.input';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { ProductLinksService } from '../product-links/product-links.service';

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(Product)
		private readonly productRepository: Repository<Product>,
		@Inject(forwardRef(() => UserService))
		private readonly userService: UserService,
		private readonly productLinksService: ProductLinksService
	) {}

	async searchProducts(query: string): Promise<Product[] | []> {
		return await this.productRepository.find({
			name: Like(`%${query}%`)
		});
	}

	async fetchAllProducts(options: any = {}): Promise<Product[]> {
		return await this.productRepository.find(options);
	}

	async fetchProductById(id: number): Promise<Product> {
		return await this.productRepository.findOneOrFail({
			where: {
				id
			},
			relations: ['links']
		});
	}

	async fetchProductByName(name: string): Promise<Product> {
		return await this.productRepository.findOneOrFail({
			where: {
				name
			},
			relations: ['links']
		});
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

	async addProduct(
		product: NewProductInput,
		posterId: number
	): Promise<Product> {
		const makersIds = product.makersIds;
		const makers = await this.fetchMakersByIds(makersIds);
		const links = await this.productLinksService.addProductLinks(product.links);

		const newProduct = new Product();
		newProduct.name = product.name;
		newProduct.tagline = product.tagline;
		newProduct.description = product?.description;
		newProduct.media = product.media;
		newProduct.links = links;
		newProduct.makers = makers;
		newProduct.posterId = posterId;
		return await this.productRepository.save(newProduct);
	}

	async checkOwnership(ownerId: number, productId: number): Promise<void> {
		const isAdmin =
			(await this.userService.fetchUserById(ownerId)).type === 'ADMIN';
		const makers = await this.fetchMakersByProductId(productId);
		const makersIds: number[] | undefined = makers?.map(user => user.id);
		const isOwner: boolean = isAdmin || makersIds?.some(id => id == ownerId);
		if (!isOwner) {
			throw new UnauthorizedException("You can't alter what's not yours");
		}
	}

	async updateProduct(
		id: number,
		{ tagline, media, links, description }: UpdatedProductInput
	): Promise<Product> {
		const productToUpdate = await this.fetchProductById(id);
		if (tagline) {
			productToUpdate.tagline = tagline;
		}
		if (description) {
			productToUpdate.description = description;
		}
		if (media) {
			if (media.logo) {
				productToUpdate.media.logo = media.logo;
			}
			if (media.pictures) {
				productToUpdate.media.pictures = media.pictures;
			}
		}
		if (links) {
			const updatedLinks = await this.productLinksService.addProductLinks(
				links
			);
			productToUpdate.links = updatedLinks;
		}
		return await this.productRepository.save(productToUpdate);
	}

	async addMaker(productId: number, makerId: number): Promise<Product> {
		const maker: User[] = await this.fetchMakersByIds([makerId]);
		const product = await this.productRepository.findOneOrFail({
			where: {
				id: productId
			},
			relations: ['makers']
		});
		product.makers.push(maker[0]);
		const updatedProduct = await this.productRepository.save(product);
		await this.userService.setUserAsMaker(makerId);
		return updatedProduct;
	}

	async deleteMaker(productId: number, makerId: number): Promise<Product> {
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
		const updatedProduct = await this.productRepository.save(product);
		await this.userService.setUserAsNormal(makerId);
		return updatedProduct;
	}

	async deleteProduct(id: number): Promise<boolean> {
		const product = await this.fetchProductById(id);
		const makers = product.makers.map(m => m.id);
		await this.productRepository.remove(product);
		for (let i = 0; i < makers.length; i++) {
			await this.userService.setUserAsNormal(i);
		}
		await this.productLinksService.deleteLinks(product.linksId);
		try {
			await this.fetchProductById(id);
			return true;
		} catch (e) {
			return false;
		}
	}

	async deleteUserProducts(
		products: Product[] | undefined,
		user: User
	): Promise<User | void> {
		if (products === undefined) return;
		if (!products.length) return user;
		products?.forEach(async (product: Product) => {
			if (product.makers.length === 1 && product.makers[0].id == user.id) {
				await this.deleteProduct(product.id);
			} else {
				await this.deleteMaker(product.id, user.id);
			}
		});
		return await this.userService.saveUser(user);
	}

	async checkProductExistance(name: string): Promise<boolean> {
		try {
			await this.productRepository.findOneOrFail({
				where: { name },
				select: ['name']
			});
			return true;
		} catch (e) {
			return false;
		}
	}
}

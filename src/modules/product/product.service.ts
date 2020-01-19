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

	async updateProduct(
		id: number,
		{ tagline, description, media, links }: UpdatedProductInput
	): Promise<Product> {
		const productToUpdate = await this.fetchProductById(id);
		if (tagline) {
			productToUpdate.tagline = tagline;
		}
		productToUpdate.description = description;
		if (media) {
			productToUpdate.media = media;
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
		return await this.productRepository.save(product);
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
		return await this.productRepository.save(product);
	}

	async deleteProduct(id: number): Promise<boolean> {
		const product = await this.fetchProductById(id);
		if (product) {
			await this.productRepository.remove(product);
		}
		const isDeleted = !(await this.fetchProductById(id));
		return isDeleted;
	}

	async deleteUserProducts(products: Product[]): Promise<boolean> {
		const deletedProducts = await this.productRepository.remove(products);
		if (!deletedProducts.length) {
			throw new InternalServerErrorException();
		}
		return true;
	}

	async checkProductExistance(name: string): Promise<boolean> {
		try {
			await this.productRepository.findOneOrFail({ name });
			return true;
		} catch (e) {
			return false;
		}
	}
}

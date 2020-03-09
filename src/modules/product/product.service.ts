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
import { SharedService } from '../shared/shared.service';
import { CompetitionService } from '../competition/competition.service';
import { Competition } from '../competition/competition.entity';

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(Product)
		private readonly productRepository: Repository<Product>,
		@Inject(forwardRef(() => UserService))
		private readonly userService: UserService,
		private readonly productLinksService: ProductLinksService,
		private readonly competitionService: CompetitionService,
		private readonly sharedService: SharedService
	) {}

	async searchProducts(query: string): Promise<Product[] | []> {
		return await this.productRepository.find({
			name: Like(`%${query}%`)
		});
	}

	async fetchAllProducts(): Promise<[Product[], number]> {
		return await this.productRepository.findAndCount();
	}

	async fetchProductById(id: number): Promise<Product> {
		return await this.productRepository.findOneOrFail({
			where: {
				id
			},
			relations: ['links', 'makers', 'competition']
		});
	}

	async fetchProductByName(name: string): Promise<Product> {
		return await this.productRepository.findOneOrFail({
			where: {
				name
			},
			relations: ['links', 'makers', 'competition']
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

	private async fetchCompetitionById(id: number): Promise<Competition> {
		return await this.competitionService.fetchCompetitionByIdOrName(id);
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
		newProduct.description = product.description;
		newProduct.media = product.media;
		newProduct.links = links;
		newProduct.makers = makers;
		newProduct.posterId = posterId;
		if (product.competitionId) {
			newProduct.competition = await this.fetchCompetitionById(
				product.competitionId
			);
		}
		const addedProduct = await this.productRepository.save(newProduct);
		for (let i = 0; i < makersIds.length; i++) {
			await this.userService.setUserAsMaker(makersIds[i]);
		}
		return addedProduct;
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
		{ tagline, media, links, description, competitionId }: UpdatedProductInput
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
		if (competitionId) {
			productToUpdate.competition = await this.fetchCompetitionById(
				competitionId
			);
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
		const deleteImage = (link: string): void =>
			this.sharedService.deleteFile(link);
		const product = await this.fetchProductById(id);
		const makers = product.makers.map(m => +m.id);
		const logo = product.media.logo;
		const pictures = product.media.pictures;
		if (logo) {
			deleteImage(logo);
		}
		pictures.forEach(p => deleteImage(p));
		await this.productRepository.remove(product);
		for (let i = 0; i < makers.length; i++) {
			await this.userService.setUserAsNormal(makers[i]);
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
		for (let i = 0; i < products.length; i++) {
			const product = products[0];
			if (product.makers.length === 1 && product.makers[0].id == user.id)
				await this.deleteProduct(product.id);
			else await this.deleteMaker(product.id, user.id);
		}
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

	async modifyScore(productId: number, score: number): Promise<void> {
		const product = await this.fetchProductById(productId);
		product.score += score;
		await this.productRepository.save(product);
	}
}

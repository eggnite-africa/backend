import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ProductLinks } from './product-links.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NewLinksInput } from './dto/newLinks.input';
import { UpdatedLinksInput } from './dto/updatedLinks.input';

@Injectable()
export class ProductLinksService {
	constructor(
		@InjectRepository(ProductLinks)
		private readonly productLinksRepository: Repository<ProductLinks>
	) {}

	private async modifyProductLinks(
		links: NewLinksInput | UpdatedLinksInput
	): Promise<ProductLinks> {
		const newLinks = new ProductLinks();
		newLinks.website = links?.website;
		newLinks.github = links?.github;
		newLinks.appStore = links?.appStore;
		newLinks.playStore = links?.playStore;

		return await this.productLinksRepository.save(newLinks);
	}

	async addProductLinks(
		productLinks: NewLinksInput | undefined
	): Promise<ProductLinks | undefined> {
		if (!productLinks) return;
		return await this.modifyProductLinks(productLinks);
	}

	async updateProductLinks(
		productLinks: UpdatedLinksInput
	): Promise<ProductLinks> {
		return await this.modifyProductLinks(productLinks);
	}

	async deleteLinks(id: number): Promise<boolean> {
		try {
			await this.productLinksRepository.delete(id);
			return true;
		} catch (e) {
			throw new InternalServerErrorException(
				'There was a problem deleting product links'
			);
		}
	}
}

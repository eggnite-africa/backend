import { Injectable } from '@nestjs/common';
import { ProductLinks } from './product-links.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NewLinksInput } from './dto/newLinks.input';

@Injectable()
export class ProductLinksService {
	constructor(
		@InjectRepository(ProductLinks)
		private readonly productLinksRepository: Repository<ProductLinks>
	) {}

	private async modifyProductLinks(
		links: NewLinksInput
	): Promise<ProductLinks> {
		const newLinks = new ProductLinks();
		newLinks.website = links.website;
		newLinks.github = links?.github;
		newLinks.appStore = links?.appStore;
		newLinks.playStore = links?.playStore;

		return await this.productLinksRepository.save(newLinks);
	}

	async addProductLinks(productLinks: NewLinksInput): Promise<ProductLinks> {
		return await this.modifyProductLinks(productLinks);
	}
}

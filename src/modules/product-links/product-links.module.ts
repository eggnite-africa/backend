import { Module } from '@nestjs/common';
import { ProductLinksService } from './product-links.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductLinks } from './product-links.entity';

@Module({
	imports: [TypeOrmModule.forFeature([ProductLinks])],
	providers: [ProductLinksService],
	exports: [ProductLinksService]
})
export class ProductLinksModule {}

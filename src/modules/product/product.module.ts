import { Module, forwardRef } from '@nestjs/common';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { VoteModule } from '../vote/vote.module';
import { CommentModule } from '../comment/comment.module';
import { UserModule } from '../user/user.module';
import { ProductLinksModule } from '../product-links/product-links.module';
import { SharedModule } from '../shared/shared.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Product]),
		forwardRef(() => VoteModule),
		CommentModule,
		ProductLinksModule,
		forwardRef(() => UserModule),
		SharedModule
	],
	providers: [ProductResolver, ProductService],
	exports: [ProductService]
})
export class ProductModule {}

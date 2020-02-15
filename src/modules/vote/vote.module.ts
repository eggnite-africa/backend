import { Module, forwardRef } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteResolver } from './vote.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './vote.entity';
import { NotificationModule } from '../notification/notification.module';
import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Vote]),
		NotificationModule,
		forwardRef(() => UserModule),
		forwardRef(() => ProductModule)
	],
	providers: [VoteService, VoteResolver],
	exports: [VoteService]
})
export class VoteModule {}

import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ProductModule } from '../product/product.module';
import { ProfileModule } from '../profile/profile.module';
import { VoteModule } from '../vote/vote.module';
import { CommentModule } from '../comment/comment.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		forwardRef(() => ProductModule),
		ProfileModule,
		VoteModule,
		CommentModule,
		NotificationModule
	],
	providers: [UserService, UserResolver],
	exports: [UserService]
})
export class UserModule {}

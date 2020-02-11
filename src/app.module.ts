import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './modules/product/product.module';
import { VoteModule } from './modules/vote/vote.module';
import { CommentModule } from './modules/comment/comment.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { NotificationModule } from './modules/notification/notification.module';
import { SharedModule } from './modules/shared/shared.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ProductLinksModule } from './modules/product-links/product-links.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { Product } from './modules/product/product.entity';
import { Vote } from './modules/vote/vote.entity';
import { User } from './modules/user/user.entity';
import { Profile } from './modules/profile/profile.entity';
import { ProductLinks } from './modules/product-links/product-links.entity';
import { Feedback } from './modules/feedback/feedback.entity';
import { Comment } from './modules/comment/comment.entitiy';
import { Notification } from './modules/notification/notification.entity';

@Module({
	imports: [
		GraphQLModule.forRoot({
			autoSchemaFile: 'schema.gql',
			context: ({ req }) => ({ req })
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			url: process.env.DATABASE_URL,
			entities: [
				Product,
				Vote,
				Comment,
				User,
				Profile,
				Notification,
				ProductLinks,
				Feedback
			],
			synchronize: true,
			ssl: process.env.NODE_ENV === 'production'
		}),
		ProductModule,
		VoteModule,
		CommentModule,
		AuthModule,
		UserModule,
		NotificationModule,
		SharedModule,
		ProfileModule,
		ProductLinksModule,
		FeedbackModule
	]
})
export class AppModule {}

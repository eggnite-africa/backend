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
import { dbConfig } from './config/db';

@Module({
	imports: [
		GraphQLModule.forRoot({
			autoSchemaFile: 'schema.gql',
			context: ({ req }) => ({ req })
		}),
		TypeOrmModule.forRoot({ ...dbConfig, type: 'postgres' }),
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

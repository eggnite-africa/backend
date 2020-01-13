import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './modules/product/product.module';
import { Product } from './modules/product/product.entity';
import { VoteModule } from './modules/vote/vote.module';
import { Vote } from './modules/vote/vote.entity';
import { CommentModule } from './modules/comment/comment.module';
import { Comment } from './modules/comment/comment.entitiy';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { User } from './modules/user/user.entity';
import { NotificationModule } from './modules/notification/notification.module';
import { Notification } from './modules/notification/notification.entity';
import { SharedModule } from './modules/shared/shared.module';
import { ProfileModule } from './modules/profile/profile.module';
import { Profile } from './modules/profile/profile.entity';
import { constants } from './config/constants';
import { ProductLinksModule } from './modules/product-links/product-links.module';
import { ProductLinks } from './modules/product-links/product-links.entity';

@Module({
	imports: [
		ProductModule,
		GraphQLModule.forRoot({
			autoSchemaFile: 'schema.gql',
			installSubscriptionHandlers: true,
			context: ({ req, connection }) => {
				if (connection) {
					const context = connection.context;
					const Authorization = context?.Authorization;
					return { req: { headers: { Authorization } } };
				} else {
					return { req };
				}
			}
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: constants.db.host,
			database: constants.db.name,
			username: constants.db.username,
			password: constants.db.password,
			entities: [
				Product,
				Vote,
				Comment,
				User,
				Profile,
				Notification,
				ProductLinks
			],
			synchronize: true
		}),
		ProductModule,
		VoteModule,
		CommentModule,
		AuthModule,
		UserModule,
		NotificationModule,
		SharedModule,
		ProfileModule,
		ProductLinksModule
	]
})
export class AppModule {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	constructor() {}
}

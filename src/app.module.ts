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

@Module({
	imports: [
		ProductModule,
		GraphQLModule.forRoot({
			autoSchemaFile: 'schema.gql',
			context: ({ req }) => {
				return { req };
			}
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			username: 'postgres',
			password: 'root',
			database: 'platform',
			entities: [Product, Vote, Comment, User],
			synchronize: true
		}),
		ProductModule,
		VoteModule,
		CommentModule,
		AuthModule,
		UserModule
	]
})
export class AppModule {}

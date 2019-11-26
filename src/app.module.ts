import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './modules/product/product.module';
import { Product } from './modules/product/product.entity';
import { VoteModule } from './modules/vote/vote.module';
import { Vote } from './modules/vote/vote.entity';
import { CommentModule } from './modules/comment/comment.module';
import { Comment } from './modules/comment/comment.entitiy';

@Module({
	imports: [
		ProductModule,
		GraphQLModule.forRoot({
			autoSchemaFile: 'schema.gql'
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			username: 'postgres',
			password: 'root',
			database: 'platform',
			entities: [Product, Vote, Comment],
			synchronize: true
		}),
		ProductModule,
		VoteModule,
		CommentModule
	]
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './modules/Product/product.module';
import { Product } from './modules/Product/product.entity';

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
			entities: [Product],
			synchronize: true
		})
	]
})
export class AppModule {}

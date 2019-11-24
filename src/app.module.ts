import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [
		GraphQLModule.forRoot({
			autoSchemaFile: 'schema.gql'
		}),
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			username: 'postgres',
			password: 'root',
			database: 'platform',
			entities: [],
			synchronize: true
		})
	]
})
export class AppModule {}

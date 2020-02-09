import { config } from 'dotenv';
config();
import { writeFileSync } from 'fs';
import { dbConfig } from './db';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const ormConfig: TypeOrmModuleOptions = {
	...dbConfig,
	entities: ['dist/**/*.entity{.ts, .js}'],
	cli: {
		migrationsDir: 'src/db/migrations'
	},
	migrations: ['src/db/migrations/*{.ts, .js}']
};

writeFileSync('ormconfig.json', JSON.stringify(ormConfig, null, 2));

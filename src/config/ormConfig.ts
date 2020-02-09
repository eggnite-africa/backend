import { config } from 'dotenv';
config();
import { writeFileSync } from 'fs';
import { dbConfig } from './db';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const ormConfig: TypeOrmModuleOptions = {
	...dbConfig,
	entities: ['src/**/*.entity{.ts, .js}']
};

writeFileSync('ormconfig.json', JSON.stringify(ormConfig, null, 2));

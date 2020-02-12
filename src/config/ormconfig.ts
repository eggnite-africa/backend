import { config } from 'dotenv';
config();

import { entities } from '../app.module';
import { constants } from './constants';
const url = constants.dbUrl;

export = {
	type: 'postgres',
	url,
	entities,
	cli: {
		migrationsDir: 'src/db/migrations'
	},
	migrations: ['dist/db/migrations/*.js'],
	dropSchema: false,
	synchronize: false
};

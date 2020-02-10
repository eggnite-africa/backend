import { config } from 'dotenv';
config();
import { constants } from '../config/constants';
import { Product } from '../modules/product/product.entity';
import { Vote } from '../modules/vote/vote.entity';
import { Comment } from '../modules/comment/comment.entitiy';
import { User } from '../modules/user/user.entity';
import { Profile } from '../modules/profile/profile.entity';
import { Notification } from '../modules/notification/notification.entity';
import { ProductLinks } from '../modules/product-links/product-links.entity';
import { Feedback } from '../modules/feedback/feedback.entity';

const db = () => {
	const entities = [
		Product,
		Vote,
		Comment,
		User,
		Profile,
		Notification,
		ProductLinks,
		Feedback
	];
	let config = {};
	if (constants.env.includes('dev')) {
		config = {
			host: constants.db.host,
			database: constants.db.name,
			username: constants.db.username,
			password: constants.db.password,
			migrations: ['src/db/migrations/*.ts']
		};
	} else {
		config = {
			url: constants.db.url,
			migrations: ['dist/db/migrations/*.js'],
			ssl: true
		};
	}
	return {
		type: 'postgres',
		...config,
		cli: {
			migrationsDir: 'db/migrations'
		},
		migrationsRun: true,
		entities,
		synchronize: false
	};
};

export const dbConfig = db();

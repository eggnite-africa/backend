import { config } from 'dotenv';
config();
import { constants } from 'src/config/constants';
import { Product } from 'src/modules/product/product.entity';
import { Vote } from 'src/modules/vote/vote.entity';
import { Comment } from 'src/modules/comment/comment.entitiy';
import { User } from 'src/modules/user/user.entity';
import { Profile } from 'src/modules/profile/profile.entity';
import { Notification } from 'src/modules/notification/notification.entity';
import { ProductLinks } from 'src/modules/product-links/product-links.entity';
import { Feedback } from 'src/modules/feedback/feedback.entity';

const db = () => {
	let config = {};
	const isDev = constants.env.includes('dev');
	const migrationExt = isDev ? 'ts' : 'js';
	if (isDev) {
		config = {
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
				ProductLinks,
				Feedback
			],
			synchronize: false
		};
	} else {
		config = {
			url: constants.db.url,
			entities: ['dist/**/*.entity{.ts,.js}'],
			ssl: true
		};
	}
	return {
		type: 'postgres',
		...config,
		cli: {
			migrationsDir: 'src/db/migrations'
		},
		migrations: [`src/db/migrations/*.${migrationExt}`],
		migrationsRun: true
	};
};

export const dbConfig = db();

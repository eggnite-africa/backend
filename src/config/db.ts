import { constants } from './constants';
import { Product } from '../modules/product/product.entity';
import { Vote } from '../modules/vote/vote.entity';
import { Comment } from '../modules/comment/comment.entitiy';
import { User } from '../modules/user/user.entity';
import { Profile } from '../modules/profile/profile.entity';
import { Notification } from '../modules/notification/notification.entity';
import { ProductLinks } from '../modules/product-links/product-links.entity';
import { Feedback } from '../modules/feedback/feedback.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const db = () => {
	if (constants.env.includes('dev')) {
		return {
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
			synchronize: true
		};
	} else {
		return {
			url: constants.db.url,
			entities: ['dist/**/*.entity{.ts,.js}'],
			ssl: true
		};
	}
};

export const dbConfig: TypeOrmModuleOptions = {
	type: 'postgres',
	...db()
};

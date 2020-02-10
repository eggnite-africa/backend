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

const dbConfig = db();
export = {
	type: 'postgres',
	...dbConfig
};

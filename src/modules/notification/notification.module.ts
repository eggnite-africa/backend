import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { NotificationResolver } from './notification.resolver';
import { PubSub } from 'graphql-subscriptions';

@Module({
	imports: [TypeOrmModule.forFeature([Notification])],
	providers: [
		NotificationService,
		NotificationResolver,
		{
			provide: 'PUB_SUB',
			useValue: new PubSub()
		}
	],
	exports: [NotificationService]
})
export class NotificationModule {}

import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { NotificationResolver } from './notification.resolver';

@Module({
	imports: [TypeOrmModule.forFeature([Notification])],
	providers: [NotificationService, NotificationResolver],
	exports: [NotificationService]
})
export class NotificationModule {}

import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteResolver } from './vote.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './vote.entity';
import { NotificationModule } from '../notification/notification.module';

@Module({
	imports: [TypeOrmModule.forFeature([Vote]), NotificationModule],
	providers: [VoteService, VoteResolver],
	exports: [VoteService]
})
export class VoteModule {}

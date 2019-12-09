import { Module } from '@nestjs/common';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entitiy';
import { NotificationModule } from '../notification/notification.module';

@Module({
	imports: [TypeOrmModule.forFeature([Comment]), NotificationModule],
	providers: [CommentResolver, CommentService],
	exports: [CommentService]
})
export class CommentModule {}

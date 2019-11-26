import { Module } from '@nestjs/common';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entitiy';

@Module({
	imports: [TypeOrmModule.forFeature([Comment])],
	providers: [CommentResolver, CommentService],
	exports: [CommentService]
})
export class CommentModule {}

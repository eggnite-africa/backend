import { Module } from '@nestjs/common';
import { FeedbackResolver } from './feedback.resolver';
import { FeedbackService } from './feedback.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feedback } from './feedback.entity';

@Module({
	providers: [FeedbackResolver, FeedbackService],
	imports: [TypeOrmModule.forFeature([Feedback])]
})
export class FeedbackModule {}

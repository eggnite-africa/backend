import { Module } from '@nestjs/common';
import { CompetitionResolver } from './competition.resolver';
import { CompetitionService } from './competition.service';
import { Competition } from './competition.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([Competition])],
	providers: [CompetitionResolver, CompetitionService]
})
export class CompetitionModule {}

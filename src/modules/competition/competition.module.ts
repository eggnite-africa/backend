import { Module } from '@nestjs/common';
import { CompetitionResolver } from './competition.resolver';
import { CompetitionService } from './competition.service';

@Module({
  providers: [CompetitionResolver, CompetitionService]
})
export class CompetitionModule {}

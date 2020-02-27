import { Module } from '@nestjs/common';
import { CompetitionResolver } from './competition.resolver';
import { CompetitionService } from './competition.service';
import { Competition } from './competition.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';

@Module({
	imports: [TypeOrmModule.forFeature([Competition]), UserModule],
	providers: [CompetitionResolver, CompetitionService],
	exports: [CompetitionService]
})
export class CompetitionModule {}

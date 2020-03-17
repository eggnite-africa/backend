import { Module } from '@nestjs/common';
import { PitchResolver } from './pitch.resolver';
import { PitchService } from './pitch.service';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pitch } from './pitch.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Pitch]), UserService],
	providers: [PitchResolver, PitchService]
})
export class PitchModule {}

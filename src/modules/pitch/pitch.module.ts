import { Module } from '@nestjs/common';
import { PitchResolver } from './pitch.resolver';
import { PitchService } from './pitch.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pitch } from './pitch.entity';
import { UserModule } from '../user/user.module';

@Module({
	imports: [TypeOrmModule.forFeature([Pitch]), UserModule],
	providers: [PitchResolver, PitchService]
})
export class PitchModule {}

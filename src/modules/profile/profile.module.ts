import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Profile])],
	providers: [ProfileService, ProfileResolver],
	exports: [ProfileService]
})
export class ProfileModule {}

import { Module, forwardRef } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { UserModule } from '../user/user.module';
import { SharedModule } from '../shared/shared.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Profile]),
		forwardRef(() => UserModule),
		SharedModule
	],
	providers: [ProfileService, ProfileResolver],
	exports: [ProfileService]
})
export class ProfileModule {}

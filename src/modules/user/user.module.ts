import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ProductModule } from '../product/product.module';
import { ProfileModule } from '../profile/profile.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([User]),
		forwardRef(() => ProductModule),
		ProfileModule
	],
	providers: [UserService, UserResolver],
	exports: [UserService]
})
export class UserModule {}

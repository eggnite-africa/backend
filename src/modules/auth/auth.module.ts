import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { GraphQLAuth } from './guard/GqlAuth.guard';
import { constants } from '../../config/constants';

@Module({
	imports: [
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secret: constants.jwtSecretKey,
			signOptions: {
				expiresIn: '2y'
			}
		}),
		UserModule
	],
	providers: [AuthService, LocalStrategy, JwtStrategy, GraphQLAuth],
	exports: [AuthService],
	controllers: [AuthController]
})
export class AuthModule {}

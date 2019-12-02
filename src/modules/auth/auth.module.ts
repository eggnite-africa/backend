import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { GraphQLAuth } from './guard/GqlAuth.guard';
import { AuthResolver } from './auth.resolver';

@Module({
	imports: [
		PassportModule,
		JwtModule.register({
			secret: 'SecretKeywLe',
			signOptions: {
				expiresIn: '1h'
			}
		}),
		forwardRef(() => UserModule)
	],
	providers: [
		AuthService,
		LocalStrategy,
		JwtStrategy,
		GraphQLAuth,
		AuthResolver
	],
	exports: [AuthService],
	controllers: [AuthController]
})
export class AuthModule {}

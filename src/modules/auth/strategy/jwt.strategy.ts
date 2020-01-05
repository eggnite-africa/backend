import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { constants } from '../../../config/constants';

export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: constants.jwtSecretKey
		});
	}

	validate(payload: any) {
		return {
			id: payload.sub,
			username: payload.username
		};
	}
}

import { Resolver, Context, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Resolver('Auth')
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Mutation(returns => Boolean)
	async logout(@Context('req') req: any) {
		return await this.authService.logout(req);
	}
}

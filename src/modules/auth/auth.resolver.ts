import { Resolver, Context, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { newPasswordInput } from './dto/newPassword.input';

@Resolver('Auth')
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@Mutation(returns => Boolean)
	async logout(@Context('req') req: any) {
		return await this.authService.logout(req);
	}

	@Mutation(returns => String)
	async forgotPassword(
		@Args({ name: 'email', type: () => String }) email: string
	) {
		return await this.authService.forgotPassword(email);
	}

	@Mutation(returns => User, { nullable: true })
	async resetPassword(
		@Args('newPassword') newPassword: newPasswordInput,
		@Context('req') req: any
	) {
		return await this.authService.resetPassword(
			newPassword.resetToken,
			newPassword.password,
			req
		);
	}
}

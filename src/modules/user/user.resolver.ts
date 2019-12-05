import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserInput } from './dto/user.input';
import { CurrentUser } from './decorator/user.decorator';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { GraphQLAuth } from '../auth/guard/GqlAuth.guard';

@Resolver((of: any) => User)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Mutation(returns => User)
	async signUp(@Args('UserInput') newUser: UserInput) {
		return await this.userService.addUser(newUser);
	}

	@Mutation(returns => Boolean)
	@UseGuards(GraphQLAuth)
	async deleteUser(
		@Args({ name: 'username', type: () => String }) username: string,
		@CurrentUser() { username: owner }: User
	) {
		if (!(username === owner)) {
			throw new UnauthorizedException('You can only delete your own account');
		}
		return await this.userService.deleteUser(username);
	}
}

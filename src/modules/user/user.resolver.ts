import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserInput } from './dto/user.input';

@Resolver((of: any) => User)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Mutation(returns => User)
	async signUp(@Args('UserInput') { username, password }: UserInput) {
		return await this.userService.addUser(username, password);
	}
}

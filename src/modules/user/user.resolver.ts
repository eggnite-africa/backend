import {
	Resolver,
	Mutation,
	Args,
	ResolveProperty,
	Query,
	Parent
} from '@nestjs/graphql';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserInput } from './dto/user.input';
import { CurrentUser } from './decorator/user.decorator';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { GraphQLAuth } from '../auth/guard/GqlAuth.guard';
import { ID } from 'type-graphql';

@Resolver((of: any) => User)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query(() => [User])
	async users(): Promise<User[]> {
		return await this.userService.fetchAllUsers();
	}

	@Query(returns => User)
	async user(
		@Args({ name: 'username', type: () => String, nullable: true })
		username: string,
		@Args({ name: 'id', type: () => ID, nullable: true }) id: number
	): Promise<User | undefined> {
		if (id) {
			return await this.userService.fetchUserById(id);
		} else {
			return await this.userService.fetchUserByUsername(username);
		}
	}

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

	@ResolveProperty('profile')
	async profile(@Parent() { id }: User) {
		return await this.userService.fetchProfileByUserId(id);
	}

	@ResolveProperty('votes')
	async votes(@Parent() { id }: User) {
		return await this.userService.fetchVotesByUserId(id);
	}

	@ResolveProperty('notifications')
	@UseGuards(GraphQLAuth)
	async notifications(@Parent() { id }: User) {
		return await this.userService.fetchAllNotificationsByUserId(id);
	}
}

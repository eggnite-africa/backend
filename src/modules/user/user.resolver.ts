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
import { NewUserInput } from './dto/newUser.input';
import { CurrentUser } from './decorator/user.decorator';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { GraphQLAuth } from '../auth/guard/GqlAuth.guard';
import { ID } from 'type-graphql';
import { Notification } from '../notification/notification.entity';
import { Profile } from '../profile/profile.entity';
import { Vote } from '../vote/vote.entity';

@Resolver(() => User)
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@Query(() => [User])
	async users(): Promise<User[]> {
		return await this.userService.fetchAllUsers();
	}

	@Query(() => Boolean)
	async checkUsernameExistance(
		@Args({ name: 'username', type: () => String }) username: string
	): Promise<boolean> {
		return await this.userService.checkUsernameExistance(username);
	}

	@Query(() => Boolean)
	async checkEmailExistance(
		@Args({ name: 'email', type: () => String }) email: string
	): Promise<boolean> {
		return await this.userService.checkEmailExistance(email);
	}

	@Query(() => User)
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

	@Mutation(() => User)
	async signUp(@Args('newUser') newUser: NewUserInput): Promise<User> {
		return await this.userService.addUser(newUser);
	}

	@Mutation(() => Boolean)
	@UseGuards(GraphQLAuth)
	async deleteUser(
		@Args({ name: 'userId', type: () => ID }) userId: number,
		@CurrentUser() { id: ownerId }: User
	): Promise<boolean> {
		if (!(userId == ownerId)) {
			throw new UnauthorizedException('You can only delete your own account');
		}
		return await this.userService.deleteUser(userId);
	}

	@ResolveProperty('profile')
	async profile(@Parent() { id }: User): Promise<Profile> {
		return await this.userService.fetchProfileByUserId(id);
	}

	@ResolveProperty('votes')
	async votes(@Parent() { id }: User): Promise<Vote[]> {
		return await this.userService.fetchVotesByUserId(id);
	}

	@ResolveProperty('notifications')
	@UseGuards(GraphQLAuth)
	async notifications(
		@Parent() { id }: User,
		@Args({ name: 'seen', type: () => Boolean, nullable: true })
		seen: boolean | undefined
	): Promise<Notification[] | undefined> {
		if (seen == false) {
			return await this.userService.fetchAllUnreadNotificationsByUserId(id);
		} else {
			return await this.userService.fetchAllNotificationsByUserId(id);
		}
	}
}

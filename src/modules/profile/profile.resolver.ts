import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Profile } from './profile.entity';
import { GraphQLAuth } from '../auth/guard/GqlAuth.guard';
import { UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileInput } from './dto/updateProfile.input';
import { ID } from 'type-graphql';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Resolver(() => Profile)
export class ProfileResolver {
	constructor(
		private readonly profileService: ProfileService,
		private readonly userService: UserService
	) {}

	@UseGuards(GraphQLAuth)
	@Mutation(() => Profile)
	async updateProfile(
		@Args({ name: 'userId', type: () => ID }) userId: number,
		@Args('updatedProfile') updatedProfile: UpdateProfileInput
	): Promise<Profile> {
		const { profileId }: User = await this.userService.fetchUserById(userId);
		return await this.profileService.updateUserProfile(
			profileId,
			updatedProfile
		);
	}
}

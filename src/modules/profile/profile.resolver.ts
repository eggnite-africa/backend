import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Profile } from './profile.entity';
import { GraphQLAuth } from '../auth/guard/GqlAuth.guard';
import { UseGuards } from '@nestjs/common';
import { User } from '../user/user.entity';
import { CurrentUser } from '../user/decorator/user.decorator';
import { ProfileService } from './profile.service';
import { updateProfileInput } from './dto/updateProfile.input';

@Resolver((of: any) => Profile)
export class ProfileResolver {
	constructor(private readonly profileService: ProfileService) {}

	@UseGuards(GraphQLAuth)
	@Mutation(returns => Profile)
	async updateProfile(
		@CurrentUser() { profileId }: User,
		@Args('updatedProfile') updatedProfile: updateProfileInput
	) {
		return await this.profileService.updateUserProfile(
			profileId,
			updatedProfile
		);
	}
}

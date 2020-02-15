import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm';
import { ProfileInput as newProfileInput } from './dto/newProfile.input';
import { UpdateProfileInput } from './dto/updateProfile.input';

@Injectable()
export class ProfileService {
	constructor(
		@InjectRepository(Profile)
		private readonly profileRepository: Repository<Profile>
	) {}

	async addUserProfile(userProfile: newProfileInput): Promise<Profile> {
		const newProfile = new Profile();
		newProfile.profilePicture = userProfile.profilePicture || '';
		newProfile.firstName = userProfile.firstName;
		newProfile.lastName = userProfile.lastName;
		newProfile.gender = userProfile.gender;
		newProfile.birthDate = userProfile.birthDate;
		newProfile.occupation = userProfile.occupation;
		newProfile.company = userProfile.company;
		newProfile.university = userProfile.university;
		newProfile.bio = userProfile.bio;
		newProfile.country = userProfile.country;
		newProfile.socialLinks = userProfile.socialLinks;
		return await this.profileRepository.save(newProfile);
	}

	async updateUserProfile(
		id: number,
		userProfile: UpdateProfileInput
	): Promise<Profile> {
		await this.profileRepository.update({ id }, userProfile);
		return await this.profileRepository.findOneOrFail({ id });
	}

	async deleteProfile(profileId: number): Promise<void> {
		await this.profileRepository.delete({ id: profileId });
	}
}

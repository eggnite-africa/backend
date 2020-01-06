import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm';
import { ProfileInput } from './dto/newProfile.input';
import { UpdateProfileInput } from './dto/updateProfile.input';

@Injectable()
export class ProfileService {
	constructor(
		@InjectRepository(Profile)
		private readonly profileRepository: Repository<Profile>
	) {}

	async addUserProfile(userProfile: ProfileInput): Promise<Profile> {
		const newProfile = new Profile();
		newProfile.firstName = userProfile.firstName;
		newProfile.lastName = userProfile.lastName;
		newProfile.sex = userProfile.sex;
		newProfile.birthDate = userProfile.birthDate;
		newProfile.occupation = userProfile.occupation;
		newProfile.university = userProfile.university;
		newProfile.bio = userProfile.bio;
		return await this.profileRepository.save(newProfile);
	}

	async updateUserProfile(id: number, userProfile: UpdateProfileInput) {
		await this.profileRepository.update({ id }, userProfile);
		return await this.profileRepository.findOneOrFail({ id });
	}
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm';
import { NewProfileInput as newProfileInput } from './dto/newProfile.input';
import { UpdateProfileInput } from './dto/updateProfile.input';
import { SharedService } from '../shared/shared.service';

@Injectable()
export class ProfileService {
	constructor(
		@InjectRepository(Profile)
		private readonly profileRepository: Repository<Profile>,
		private readonly sharedService: SharedService
	) {}

	async addUserProfile(userProfile: newProfileInput): Promise<Profile> {
		const newProfile = new Profile();
		newProfile.picture = userProfile.picture;
		newProfile.fullName = userProfile.fullName;
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

	async deleteProfile(id: number): Promise<void> {
		const profile = await this.profileRepository.findOneOrFail(id);
		if (profile.picture) this.sharedService.deleteFile(profile.picture);
		try {
			await this.profileRepository.remove(profile);
		} catch (e) {
			throw Error(`There was a problem deleting profile: ${id}`);
		}
	}
}

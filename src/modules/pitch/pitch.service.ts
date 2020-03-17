import { Injectable } from '@nestjs/common';
import { Pitch } from './pitch.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NewPitchInput } from './dto/newPitch.input';
import { UserService } from '../user/user.service';
import { UpdatedPitchInput } from './dto/updatedPitch.input';
import { UnauthorizedError } from 'type-graphql';

@Injectable()
export class PitchService {
	constructor(
		@InjectRepository(Pitch)
		private readonly pitchRepository: Repository<Pitch>,
		private readonly userService: UserService
	) {}
	async fetchAllPitchs(): Promise<Pitch[]> {
		return await this.pitchRepository.find({ relations: ['user'] });
	}

	async fetchPitchById(id: number): Promise<Pitch> {
		return await this.pitchRepository.findOneOrFail({
			where: {
				id
			},
			relations: ['user']
		});
	}

	async addPitch(pitch: NewPitchInput): Promise<Pitch> {
		const user = await this.userService.fetchUserById(pitch.userId);
		const newPitch = new Pitch();
		newPitch.title = pitch.title;
		newPitch.content = pitch.content;
		newPitch.user = user;
		return await this.pitchRepository.save(newPitch);
	}

	async udpatePitch(pitch: UpdatedPitchInput, userId: number): Promise<Pitch> {
		const updatedPitch = await this.fetchPitchById(pitch.id);
		if (userId != pitch.userId) throw new UnauthorizedError();
		if (pitch.content) {
			updatedPitch.content = pitch.content;
		}
		return await this.pitchRepository.save(updatedPitch);
	}

	async deletePitch(id: number, userId: number): Promise<boolean> {
		try {
			const pitch = await this.fetchPitchById(id);
			if (userId != pitch.user.id) throw new UnauthorizedError();
			await this.pitchRepository.remove(pitch);
			return true;
		} catch (e) {
			return false;
		}
	}
}

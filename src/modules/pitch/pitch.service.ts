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
	async fetchAllPitchs(): Promise<[Pitch[], number]> {
		return await this.pitchRepository.findAndCount({
			relations: ['user', 'votes']
		});
	}

	async fetchPitchById(id: number): Promise<Pitch> {
		return await this.pitchRepository.findOneOrFail({
			where: {
				id
			},
			relations: ['user', 'votes']
		});
	}

	async addPitch(pitch: NewPitchInput, userId: number): Promise<Pitch> {
		const user = await this.userService.fetchUserById(userId);
		const newPitch = new Pitch();
		newPitch.title = pitch.title;
		newPitch.problem = pitch.problem;
		newPitch.solution = pitch.solution;
		newPitch.skills = pitch.skills;
		newPitch.needs = pitch.needs;
		newPitch.user = user;
		return await this.pitchRepository.save(newPitch);
	}

	async udpatePitch(pitch: UpdatedPitchInput, userId: number): Promise<Pitch> {
		const updatedPitch = await this.fetchPitchById(pitch.id);
		if (userId != updatedPitch.user.id) throw new UnauthorizedError();
		if (pitch.title) updatedPitch.title = pitch.title;
		if (pitch.problem) updatedPitch.problem = pitch.problem;
		if (pitch.solution) updatedPitch.solution = pitch.solution;
		if (pitch.skills) updatedPitch.skills = pitch.skills;
		if (pitch.needs) updatedPitch.needs = pitch.needs;
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

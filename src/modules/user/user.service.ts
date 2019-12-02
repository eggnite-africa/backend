import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>
	) {}

	async fetchMakers(makersIds: number[]): Promise<User[]> {
		return await this.userRepository.findByIds(makersIds);
	}

	async findOne(username: string): Promise<User | undefined> {
		return await this.userRepository.findOne({ username });
	}

	async addUser(username: string, password: string): Promise<User> {
		return await this.userRepository.save({
			username,
			password
		});
	}
}

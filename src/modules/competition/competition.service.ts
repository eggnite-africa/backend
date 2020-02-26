import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Competition } from './competition.entity';
import { NewCompetitionInput } from './dto/newCompetition.input';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class CompetitionService {
	constructor(
		private readonly competitionRepository: Repository<Competition>,
		@Inject() private readonly userService: UserService
	) {}

	async fetchAllCompetitions(): Promise<[Competition[], number]> {
		return await this.competitionRepository.findAndCount();
	}

	private async fetchCompetitionById(id?: number): Promise<Competition> {
		return await this.competitionRepository.findOneOrFail({ id });
	}

	private async fetchCompetitionByName(name?: string): Promise<Competition> {
		return await this.competitionRepository.findOneOrFail({ name });
	}

	async fetchCompetitionByIdOrName(
		id?: number,
		name?: string
	): Promise<Competition> {
		if (id) return await this.fetchCompetitionById(id);
		return await this.fetchCompetitionByName(name);
	}

	private async fetchUsers(ids: number[]): Promise<User[]> {
		const _fetchUser = async (id: number): Promise<User> =>
			await this.userService.fetchUserById(id);

		const users: User[] = [];
		for (const id of ids) {
			const user: User = await _fetchUser(id);
			users.push(user);
		}
		return users;
	}

	async addCompetition(competition: NewCompetitionInput): Promise<Competition> {
		const newCompetition = new Competition();
		newCompetition.logo = competition.logo;
		newCompetition.name = competition.name;
		newCompetition.description = competition.description;
		newCompetition.moderators = await this.fetchUsers(competition.moderators);
		newCompetition.jury = await this.fetchUsers(competition.jury);
		return await this.competitionRepository.save(newCompetition);
	}
}

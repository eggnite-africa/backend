import {
	Injectable,
	Inject,
	InternalServerErrorException
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Competition } from './competition.entity';
import { NewCompetitionInput } from './dto/newCompetition.input';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { UpdatedCompetitionInput } from './dto/updatedCompetition.input';

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

	async updateCompetition(
		id: number,
		competition: UpdatedCompetitionInput
	): Promise<Competition> {
		const { logo, name, description, jury, moderators } = competition;
		const competitionToUpdate = await this.fetchCompetitionById(id);
		competitionToUpdate.logo = logo;
		if (name) competitionToUpdate.name = name;
		if (description) competitionToUpdate.description = description;
		if (jury) {
			competitionToUpdate.jury = await this.fetchUsers(jury);
		}
		if (moderators) {
			competitionToUpdate.moderators = await this.fetchUsers(moderators);
		}
		return await this.competitionRepository.save(competitionToUpdate);
	}

	async deleteCompetition(id: number): Promise<boolean> {
		try {
			const { moderators, jury } = await this.fetchCompetitionById(id);
			await this.competitionRepository.delete(id);
			for (const mod of moderators) {
				mod.competitions = mod.competitions?.filter(c => c.id !== id);
				await this.userService.saveUser(mod);
			}
			for (const juror of jury) {
				juror.competitions = juror.competitions?.filter(c => c.id !== id);
				await this.userService.saveUser(juror);
			}
			return true;
		} catch (e) {
			throw new InternalServerErrorException(
				'There was a problem deleting the competition',
				e
			);
		}
	}
}

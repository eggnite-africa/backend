import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Competition } from './competition.entity';

@Injectable()
export class CompetitionService {
	constructor(
		private readonly competitionRepository: Repository<Competition>
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
}

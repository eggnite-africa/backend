import { Resolver, Query, Args } from '@nestjs/graphql';
import { Competition } from './competition.entity';
import { CompetitionService } from './competition.service';
import { ID } from 'type-graphql';

@Resolver(() => Competition)
export class CompetitionResolver {
	constructor(private readonly competitionService: CompetitionService) {}

	@Query(() => [Competition])
	async competitions(): Promise<Competition[]> {
		return await this.competitionService.fetchAllCompetitions();
	}

	@Query(() => Competition)
	async competition(
		@Args({ name: 'id', type: () => ID, nullable: true }) id?: number,
		@Args({ name: 'name', type: () => String, nullable: true }) name?: string
	): Promise<Competition> {
		return await this.competitionService.fetchCompetitionByIdOrName(id, name);
	}
}

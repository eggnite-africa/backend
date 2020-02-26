import { Resolver, Query, Args } from '@nestjs/graphql';
import { Competition } from './competition.entity';
import { CompetitionService } from './competition.service';
import { ID, Int } from 'type-graphql';
import { Competitions } from './type/competitions.type';

@Resolver(() => Competition)
export class CompetitionResolver {
	constructor(private readonly competitionService: CompetitionService) {}

	@Query(() => Competitions)
	async competitionsList(
		@Args({ name: 'page', type: () => Int, nullable: true })
		page: number,
		@Args({ name: 'pageSize', type: () => Int, defaultValue: 4 })
		pageSize: number
	): Promise<Competitions> {
		const start = page * pageSize;
		const end = start + pageSize;
		const [
			competitions,
			totalCount
		] = await this.competitionService.fetchAllCompetitions();
		return {
			totalCount,
			competitions: competitions.slice(start, end),
			hasMore: end < competitions.length
		};
	}

	@Query(() => Competition)
	async competition(
		@Args({ name: 'id', type: () => ID, nullable: true }) id?: number,
		@Args({ name: 'name', type: () => String, nullable: true }) name?: string
	): Promise<Competition> {
		return await this.competitionService.fetchCompetitionByIdOrName(id, name);
	}
}

import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Competition } from './competition.entity';
import { CompetitionService } from './competition.service';
import { ID, Int } from 'type-graphql';
import { Competitions } from './type/competitions.type';
import { UseGuards } from '@nestjs/common';
import { GraphQLAuth } from '../auth/guard/GqlAuth.guard';
import { NewCompetitionInput } from './dto/newCompetition.input';
import { UpdatedCompetitionInput } from './dto/updatedCompetition.input';

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

	@Mutation(() => Competition)
	@UseGuards(GraphQLAuth)
	async addCompetition(
		@Args({ name: 'newCompetition', type: () => NewCompetitionInput })
		newCompetition: NewCompetitionInput
	): Promise<Competition> {
		return await this.competitionService.addCompetition(newCompetition);
	}

	@Mutation(() => Competition)
	@UseGuards(GraphQLAuth)
	async updateCompetition(
		@Args({ name: 'id', type: () => ID }) id: number,
		@Args({ name: 'updatedCompetition', type: () => UpdatedCompetitionInput })
		updatedCompetition: UpdatedCompetitionInput
	): Promise<Competition> {
		return await this.competitionService.updateCompetition(
			id,
			updatedCompetition
		);
	}

	@Mutation(() => Boolean)
	@UseGuards(GraphQLAuth)
	async deleteCompetition(
		@Args({ name: 'id', type: () => ID }) id: number
	): Promise<boolean> {
		return await this.competitionService.deleteCompetition(id);
	}
}

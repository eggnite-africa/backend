import { InputType, Field, ID } from 'type-graphql';
import { IsNotEmpty, ArrayNotEmpty, IsOptional, IsDate } from 'class-validator';
import { UpdatedOrganizerInput } from './updatedOrganizer.input';

@InputType()
export class UpdatedCompetitionInput {
	@Field(() => String, { nullable: true })
	@IsNotEmpty()
	@IsOptional()
	description?: string;

	@Field(() => String, { nullable: true })
	@IsOptional()
	logo?: string;

	@Field(() => [ID], { nullable: true })
	@ArrayNotEmpty()
	@IsOptional()
	moderators?: number[];

	@Field(() => [ID], { nullable: true })
	@ArrayNotEmpty()
	@IsOptional()
	jury?: number[];

	@Field(() => Date)
	@IsDate()
	startDate?: Date;

	@Field(() => Date)
	@IsDate()
	endDate?: Date;

	@Field(() => [UpdatedOrganizerInput], { nullable: 'itemsAndList' })
	organizers?: UpdatedOrganizerInput[];
}

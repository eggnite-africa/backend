import { InputType, Field, ID } from 'type-graphql';
import { IsNotEmpty, ArrayNotEmpty, IsDate } from 'class-validator';

@InputType()
export class NewCompetitionInput {
	@Field(() => String)
	@IsNotEmpty()
	name!: string;

	@Field(() => String)
	@IsNotEmpty()
	description!: string;

	@Field(() => String, { nullable: true })
	logo?: string;

	@Field(() => [ID])
	@ArrayNotEmpty()
	moderators!: number[];

	@Field(() => [ID])
	@ArrayNotEmpty()
	jury!: number[];

	@Field(() => Date)
	@IsDate()
	startDate!: Date;

	@Field(() => Date)
	@IsDate()
	endDate!: Date;
}

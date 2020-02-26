import { InputType, Field, ID } from 'type-graphql';
import { IsNotEmpty, IsNumberString } from 'class-validator';

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

	@Field(() => [ID], { nullable: true })
	@IsNumberString({ each: true })
	moderators?: number[];

	@Field(() => [ID])
	jury!: number[];
}

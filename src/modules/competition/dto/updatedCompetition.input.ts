import { InputType, Field, ID } from 'type-graphql';
import { IsNotEmpty, IsNumberString } from 'class-validator';

@InputType()
export class UpdatedCompetitionInput {
	@Field(() => String, { nullable: true })
	@IsNotEmpty()
	name?: string;

	@Field(() => String, { nullable: true })
	@IsNotEmpty()
	description?: string;

	@Field(() => String, { nullable: true })
	logo?: string;

	@Field(() => [ID], { nullable: true })
	@IsNumberString({ each: true })
	moderators?: number[];

	@Field(() => [ID], { nullable: true })
	jury?: number[];
}

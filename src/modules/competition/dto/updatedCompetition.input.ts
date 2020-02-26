import { InputType, Field, ID } from 'type-graphql';
import { IsNotEmpty, ArrayNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class UpdatedCompetitionInput {
	@Field(() => String, { nullable: true })
	@IsNotEmpty()
	@IsOptional()
	name?: string;

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
}

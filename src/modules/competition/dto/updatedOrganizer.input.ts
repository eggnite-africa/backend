import { InputType, Field } from 'type-graphql';

@InputType()
export class UpdatedOrganizerInput {
	@Field(() => String, { nullable: true })
	logo?: string;

	@Field(() => String, { nullable: true })
	name?: string;

	@Field(() => String, { nullable: true })
	website?: string;
}

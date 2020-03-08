import { InputType, Field } from 'type-graphql';

@InputType()
export class UpdatedOrganizerInput {
	@Field({ nullable: true })
	logo?: string;

	@Field({ nullable: true })
	name?: string;

	@Field({ nullable: true })
	website?: string;
}

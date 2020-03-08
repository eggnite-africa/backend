import { InputType, Field } from 'type-graphql';

@InputType()
export class NewOrganizerInput {
	@Field()
	logo!: string;

	@Field()
	name!: string;

	@Field({ nullable: true })
	website?: string;
}

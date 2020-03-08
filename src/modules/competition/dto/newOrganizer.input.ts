import { InputType, Field } from 'type-graphql';

@InputType()
export class NewOrganizerInput {
	@Field(() => String)
	logo!: string;

	@Field(() => String)
	name!: string;

	@Field(() => String, { nullable: true })
	website?: string;
}

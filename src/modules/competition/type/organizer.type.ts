import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Organizer {
	@Field(() => String)
	logo!: string;

	@Field(() => String)
	name!: string;

	@Field(() => String, { nullable: true })
	website?: string;
}

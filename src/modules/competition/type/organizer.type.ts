import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Organizer {
	@Field()
	logo!: string;

	@Field()
	name!: string;

	@Field({ nullable: true })
	website?: string;
}

import { InputType, ID, Field } from 'type-graphql';
import { Pitch } from '../pitch.entity';

@InputType()
export class UpdatedPitchInput implements Partial<Pitch> {
	@Field(() => ID)
	id!: number;

	@Field(() => String, { nullable: true })
	problem?: string;

	@Field(() => String, { nullable: true })
	solution?: string;

	@Field(() => String, { nullable: true })
	skills?: string;

	@Field(() => String, { nullable: true })
	needs?: string;
}

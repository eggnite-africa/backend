import { InputType, Field, ID } from 'type-graphql';
import { Pitch } from '../pitch.entity';

@InputType()
export class NewPitchInput implements Partial<Pitch> {
	@Field(() => String)
	title!: string;

	@Field(() => String)
	problem!: string;

	@Field(() => String)
	solution!: string;

	@Field(() => String)
	skills!: string;

	@Field(() => String)
	needs!: string;
}

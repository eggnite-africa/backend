import { InputType, Field, ID } from 'type-graphql';
import { Pitch } from '../pitch.entity';

@InputType()
export class NewPitchInput implements Partial<Pitch> {
	@Field(() => String)
	title!: string;

	@Field(() => String)
	content!: string;

	@Field(() => ID)
	userId!: number;
}

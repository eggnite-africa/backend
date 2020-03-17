import { InputType, ID, Field } from 'type-graphql';
import { Pitch } from '../pitch.entity';

@InputType()
export class UpdatedPitchInput implements Partial<Pitch> {
	@Field(() => ID)
	id!: number;

	@Field(() => String, { nullable: true })
	content?: string;

	@Field(() => ID)
	userId!: number;
}

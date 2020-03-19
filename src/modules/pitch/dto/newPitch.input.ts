import { InputType, Field, ID } from 'type-graphql';
import { Pitch } from '../pitch.entity';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class NewPitchInput implements Partial<Pitch> {
	@Field(() => String)
	@IsNotEmpty()
	name!: string;

	@Field(() => String)
	@IsNotEmpty()
	problem!: string;

	@Field(() => String)
	@IsNotEmpty()
	solution!: string;

	@Field(() => String)
	@IsNotEmpty()
	skills!: string;

	@Field(() => String)
	@IsNotEmpty()
	needs!: string;
}

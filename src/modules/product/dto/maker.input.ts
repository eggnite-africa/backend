import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class MakerInput {
	@Field(() => ID)
	productId!: number;

	@Field(() => ID)
	makerId!: number;
}

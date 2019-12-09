import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class MakerInput {
	@Field(type => ID)
	productId!: number;

	@Field(type => ID)
	makerId!: number;
}

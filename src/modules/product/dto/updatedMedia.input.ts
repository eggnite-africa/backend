import { InputType, Field } from 'type-graphql';
import { Media } from './media.type';
import { IsFQDN } from 'class-validator';

@InputType()
export class UpdatedMediaInput implements Partial<Media> {
	@Field(() => String, { nullable: true })
	@IsFQDN()
	logo!: string;

	@Field(() => [String], { nullable: 'itemsAndList' })
	pictures!: string[];

	@Field(() => [String], { nullable: 'itemsAndList' })
	videos?: string[];
}

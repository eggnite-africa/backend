import { InputType, Field } from 'type-graphql';
import { Media } from './media.type';
import { IsFQDN } from 'class-validator';

@InputType()
export class MediaInput implements Partial<Media> {
	@Field(() => String)
	@IsFQDN()
	logo!: string;

	@Field(() => [String])
	pictures!: string[];

	@Field(() => [String], { nullable: 'itemsAndList' })
	videos?: string[];
}

import { InputType, Field } from 'type-graphql';
import { Media } from './media.type';

@InputType()
export class MediaInput implements Partial<Media> {
	@Field(type => String)
	logo: string;

	@Field(type => [String])
	pictures: string[];

	@Field(type => [String], { nullable: 'itemsAndList' })
	videos?: string[];
}

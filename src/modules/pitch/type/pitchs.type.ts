import { ObjectType, Field, Int } from 'type-graphql';
import { Pitch } from '../pitch.entity';

@ObjectType()
export class Pitchs {
	@Field(() => Int)
	totalCount!: number;

	@Field(() => [Pitch], { nullable: 'itemsAndList' })
	pitchs!: Pitch[];

	@Field(() => Boolean)
	hasMore!: boolean;
}

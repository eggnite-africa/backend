import { ObjectType, Field, Int } from 'type-graphql';
import { Competition } from '../competition.entity';

@ObjectType()
export class Competitions {
	@Field(() => Int)
	totalCount!: number;

	@Field(() => [Competition], { nullable: 'itemsAndList' })
	competitions?: Competition[];

	@Field(() => Boolean)
	hasMore!: boolean;
}

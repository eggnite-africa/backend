import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	OneToMany
} from 'typeorm';
import { ObjectType, ID, Field } from 'type-graphql';
import { User } from '../user/user.entity';
import { Vote } from '../vote/vote.entity';

@Entity()
@ObjectType()
export class Pitch extends BaseEntity {
	@PrimaryGeneratedColumn()
	@Field(() => ID)
	readonly id!: number;

	@Field(() => String)
	@Column({
		unique: true
	})
	title!: string;

	@Field(() => String)
	@Column()
	content!: string;

	@Field(() => User)
	@ManyToOne(
		() => User,
		user => user.pitch
	)
	user!: User;

	@Field(() => [Vote], { nullable: true })
	@OneToMany(
		() => Vote,
		vote => vote.product
	)
	votes?: Vote[];
}

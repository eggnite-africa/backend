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
import { Comment } from '../comment/comment.entitiy';

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
	problem!: string;

	@Field(() => String)
	@Column()
	solution!: string;

	@Field(() => String)
	@Column()
	skills!: string;

	@Field(() => String)
	@Column()
	needs!: string;

	@Field(() => User)
	@ManyToOne(
		() => User,
		user => user.pitch
	)
	user!: User;

	@Field(() => [Vote], { nullable: true })
	@OneToMany(
		() => Vote,
		vote => vote.pitch
	)
	votes?: Vote[];

	@Field(() => [Comment], { nullable: true })
	@OneToMany(
		() => Comment,
		comment => comment.pitch
	)
	comments?: Comment[];
}

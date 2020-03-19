import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn
} from 'typeorm';
import { ObjectType, ID, Field } from 'type-graphql';
import { User } from '../user/user.entity';
import { Vote } from '../vote/vote.entity';
import { Comment } from '../comment/comment.entitiy';
import { IsNotEmpty } from 'class-validator';

@Entity()
@ObjectType()
export class Pitch extends BaseEntity {
	@PrimaryGeneratedColumn()
	@Field(() => ID)
	readonly id!: number;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@Field(() => String)
	@Column()
	@IsNotEmpty()
	name!: string;

	@Field(() => String)
	@Column()
	@IsNotEmpty()
	problem!: string;

	@Field(() => String)
	@Column()
	@IsNotEmpty()
	solution!: string;

	@Field(() => String)
	@Column()
	@IsNotEmpty()
	skills!: string;

	@Field(() => String)
	@Column()
	@IsNotEmpty()
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

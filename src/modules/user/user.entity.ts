import { ObjectType, ID, Field } from 'type-graphql';

import {
	Entity,
	BaseEntity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	ManyToMany,
	JoinTable
} from 'typeorm';
import { Comment } from '../comment/comment.entitiy';
import { Vote } from '../vote/vote.entity';
import { Product } from '../productModule/product.entity';

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field(type => ID)
	@PrimaryGeneratedColumn()
	readonly id!: number;

	@Field(type => String)
	@Column()
	username!: string;

	@Column()
	password!: string;

	@Field(type => [Comment], { nullable: 'itemsAndList' })
	@OneToMany(
		type => Comment,
		comment => comment.user
	)
	comments?: Comment[];

	@Field(type => [Vote], { nullable: 'itemsAndList' })
	@OneToMany(
		type => Vote,
		vote => vote.userId
	)
	votes?: Vote[];

	@Field(type => [Product], { nullable: 'itemsAndList' })
	@ManyToMany(
		type => Product,
		product => product.makers
	)
	@JoinTable()
	products?: Product[];
}

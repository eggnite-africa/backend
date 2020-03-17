/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	BaseEntity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	Column,
	ManyToOne,
	Entity
} from 'typeorm';

import { Product } from '../product/product.entity';
import { Field, ID, ObjectType } from 'type-graphql';
import { User } from '../user/user.entity';
import { Pitch } from '../pitch/pitch.entity';

@ObjectType()
@Entity()
export class Vote extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id!: number;

	@CreateDateColumn()
	createdAt!: Date;

	@ManyToOne(
		type => Product,
		product => product.votes,
		{
			onDelete: 'CASCADE',
			nullable: true
		}
	)
	product?: Product;
	@Field(() => ID, { nullable: true })
	@Column({ nullable: true })
	productId?: number;

	@ManyToOne(
		type => Pitch,
		pitch => pitch.votes,
		{
			onDelete: 'CASCADE',
			nullable: true
		}
	)
	pitch?: Pitch;
	@Field(() => ID, { nullable: true })
	@Column({ nullable: true })
	pitchId?: number;

	@ManyToOne(
		type => User,
		user => user.votes,
		{
			onDelete: 'CASCADE'
		}
	)
	user!: User;
	@Field(() => ID)
	@Column()
	userId!: number;
}

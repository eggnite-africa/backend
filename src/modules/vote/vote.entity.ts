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

	@Field(() => Product, { nullable: true })
	@ManyToOne(
		type => Product,
		product => product.votes,
		{
			onDelete: 'CASCADE',
			nullable: true,
			eager: true
		}
	)
	product?: Product;
	@Field(() => ID, { nullable: true })
	@Column({ nullable: true })
	productId?: number;

	@Field(() => Pitch, { nullable: true })
	@ManyToOne(
		type => Pitch,
		pitch => pitch.votes,
		{
			onDelete: 'CASCADE',
			nullable: true,
			eager: true
		}
	)
	pitch?: Pitch;
	@Field(() => ID, { nullable: true })
	@Column({ nullable: true })
	pitchId?: number;

	@Field(() => User)
	@ManyToOne(
		type => User,
		user => user.votes,
		{
			onDelete: 'CASCADE',
			eager: true
		}
	)
	user!: User;
	@Field(() => ID)
	@Column()
	userId!: number;
}

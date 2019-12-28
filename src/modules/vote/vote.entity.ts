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

@ObjectType()
@Entity()
export class Vote extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	id!: number;

	@CreateDateColumn()
	createdAt!: Date;

	@Field(() => ID)
	@Column()
	productId!: number;

	@ManyToOne(
		type => Product,
		product => product.votes,
		{
			onDelete: 'CASCADE'
		}
	)
	product!: Product;

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

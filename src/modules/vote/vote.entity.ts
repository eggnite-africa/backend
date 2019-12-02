import {
	BaseEntity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	Column,
	ManyToOne,
	Entity
} from 'typeorm';

import { Product } from '../productModule/product.entity';
import { Field, ID, ObjectType } from 'type-graphql';
import { User } from '../user/user.entity';

@ObjectType()
@Entity()
export class Vote extends BaseEntity {
	@Field(type => ID)
	@PrimaryGeneratedColumn()
	id!: number;

	@CreateDateColumn()
	createdAt!: Date;

	@Field(type => ID)
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
		user => user.votes
	)
	user!: User;
	@Field(type => ID)
	@Column()
	userId!: number;
}

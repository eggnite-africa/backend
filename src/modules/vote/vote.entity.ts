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

@ObjectType()
@Entity()
export class Vote extends BaseEntity {
	@Field(type => ID)
	@PrimaryGeneratedColumn()
	id: string;

	@CreateDateColumn()
	createdAt: Date;

	@Field(type => ID)
	@Column()
	voterId: number;

	@Field(type => ID)
	@Column()
	productId: number;

	@ManyToOne(
		type => Product,
		product => product.votes
	)
	product: Product;
}

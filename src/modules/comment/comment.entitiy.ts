import {
	Entity,
	BaseEntity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Product } from '../product/product.entity';

@Entity()
@ObjectType()
export class Comment extends BaseEntity {
	@Field(type => ID)
	@PrimaryGeneratedColumn()
	readonly id: number;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@Field(type => String)
	@Column({ type: 'text' })
	content: string;

	@ManyToOne(
		type => Product,
		product => product.comments
	)
	product: Product;
	@Field(type => ID)
	@Column()
	productId: number;
}

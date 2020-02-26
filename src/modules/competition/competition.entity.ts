import {
	BaseEntity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	Column,
	Entity,
	ManyToOne
} from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { Product } from '../product/product.entity';
import { IsNotEmpty } from 'class-validator';
import { User } from '../user/user.entity';

@ObjectType()
@Entity()
export class Competition extends BaseEntity {
	@PrimaryGeneratedColumn()
	readonly id!: number;

	@CreateDateColumn()
	readonly createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@Field(() => String)
	@IsNotEmpty()
	@Column({ unique: true })
	name!: string;

	@Field(() => String)
	@IsNotEmpty()
	@Column()
	description!: string;

	@Field(() => [Product])
	products!: Product[];

	@Field(() => [User])
	moderators!: User[];

	@Field(() => [User])
	jury!: User[];
}

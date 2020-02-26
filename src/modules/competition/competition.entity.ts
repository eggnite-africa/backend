import {
	BaseEntity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	Column,
	Entity,
	OneToMany,
	ManyToMany,
	JoinTable
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
	@Column()
	logo!: string;

	@Field(() => String)
	@IsNotEmpty()
	@Column({ unique: true })
	name!: string;

	@Field(() => String)
	@IsNotEmpty()
	@Column()
	description!: string;

	@Field(() => [Product])
	@OneToMany(
		() => Product,
		Product => Product.competition
	)
	products!: Product[];

	@Field(() => [User])
	@ManyToMany(() => User)
	@JoinTable()
	moderators!: User[];

	@Field(() => [User])
	@ManyToMany(() => User)
	@JoinTable()
	jury!: User[];
}

import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	Column
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
@Entity()
export class ProductLinks extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	readonly id!: number;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@Field(() => String, { nullable: true })
	@Column({ nullable: true })
	website?: string;

	@Field(() => String, { nullable: true })
	@Column({ nullable: true })
	github?: string;

	@Field(() => String, { nullable: true })
	@Column({ nullable: true })
	appStore?: string;

	@Field(() => String, { nullable: true })
	@Column({ nullable: true })
	playStore?: string;
}

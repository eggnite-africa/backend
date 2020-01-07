import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	Column
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { IsNotEmpty, IsFQDN } from 'class-validator';

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

	@Field(() => String)
	@Column({ nullable: false })
	@IsNotEmpty()
	@IsFQDN()
	website!: string;

	@Field(() => String, { nullable: true })
	@Column()
	@IsFQDN()
	github?: string;

	@Field(() => String, { nullable: true })
	@Column()
	@IsFQDN()
	appStore?: string;

	@Field(() => String, { nullable: true })
	@Column()
	@IsFQDN()
	playStore?: string;
}

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
	@Column({ nullable: false })
	website!: string;

	@Field(() => String, { nullable: true })
	@Column()
	github?: string;

	@Field(() => String, { nullable: true })
	@Column()
	appStore?: string;

	@Field(() => String, { nullable: true })
	@Column()
	playStore?: string;
}

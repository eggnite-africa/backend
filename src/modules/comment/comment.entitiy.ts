/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	Entity,
	BaseEntity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Product } from '../product/product.entity';
import { User } from '../user/user.entity';
import { IsNotEmpty } from 'class-validator';
import { Pitch } from '../pitch/pitch.entity';

@Entity({
	orderBy: {
		createdAt: 'DESC'
	}
})
@ObjectType()
export class Comment extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	readonly id!: number;

	@Field(() => Date, { name: 'postedAt' })
	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@Field(() => String)
	@Column({ type: 'text' })
	@IsNotEmpty()
	content!: string;

	@ManyToOne(
		() => Product,
		product => product.comments,
		{
			onDelete: 'CASCADE',
			nullable: true
		}
	)
	product?: Product;
	@Field(() => ID, { nullable: true })
	@Column({ nullable: true })
	productId?: number;

	@ManyToOne(
		() => Pitch,
		pitch => pitch.comments,
		{
			onDelete: 'CASCADE',
			nullable: true
		}
	)
	pitch?: Pitch;
	@Field(() => ID, { nullable: true })
	@Column({ nullable: true })
	pitchId?: number;

	@ManyToOne(
		type => Comment,
		comment => comment.replies
	)
	parent!: Comment;
	@Field(() => ID, { nullable: true })
	@Column({ nullable: true })
	parentId?: number;

	@OneToMany(
		type => Comment,
		comment => comment.parent
	)
	@Field(() => [Comment], { nullable: 'itemsAndList' })
	replies?: Comment[];

	@ManyToOne(
		type => User,
		user => user.comments,
		{
			onDelete: 'CASCADE'
		}
	)
	user!: User;
	@Field(() => ID)
	@Column()
	userId!: number;
}

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
import { Product } from '../productModule/product.entity';
import { User } from '../user/user.entity';

@Entity()
@ObjectType()
export class Comment extends BaseEntity {
	@Field(type => ID)
	@PrimaryGeneratedColumn()
	readonly id!: number;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@Field(type => String)
	@Column({ type: 'text' })
	content!: string;

	@ManyToOne(
		type => Product,
		product => product.comments,
		{
			onDelete: 'CASCADE'
		}
	)
	product!: Product;
	@Field(type => ID)
	@Column({ nullable: true })
	productId?: number;

	@ManyToOne(
		type => Comment,
		comment => comment.replies
	)
	parent!: Comment;
	@Field(type => ID, { nullable: true })
	@Column({ nullable: true })
	parentId?: number;

	@OneToMany(
		type => Comment,
		comment => comment.parent
	)
	@Field(type => [Comment], { nullable: 'itemsAndList' })
	replies?: Comment[];

	@ManyToOne(
		type => User,
		user => user.comments
	)
	user!: User;
	@Field(type => ID)
	@Column()
	userId!: number;
}

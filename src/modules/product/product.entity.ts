import {
	BaseEntity,
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	ManyToMany,
	OneToOne,
	JoinColumn,
	ManyToOne
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { IsNotEmpty } from 'class-validator';
import { Media } from './dto/media.type';
import { Vote } from '../vote/vote.entity';
import { Comment } from '../comment/comment.entitiy';
import { User } from '../user/user.entity';
import { ProductLinks } from '../product-links/product-links.entity';

@ObjectType()
@Entity({
	orderBy: {
		createdAt: 'DESC'
	}
})
export class Product extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	readonly id!: number;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@Field(() => String)
	@Column({ type: 'text', unique: true, nullable: false })
	@IsNotEmpty()
	name!: string;

	@Field(() => String)
	@IsNotEmpty()
	@Column()
	tagline!: string;

	@Field(() => String)
	@Column()
	@IsNotEmpty()
	description!: string;

	@Field(() => ProductLinks)
	@OneToOne(() => ProductLinks, {
		onDelete: 'CASCADE'
	})
	@JoinColumn()
	links!: ProductLinks;
	@Column()
	linksId!: number;

	@Field(() => Media)
	@Column('json')
	media!: Media;

	@Field(() => [Vote], { nullable: true })
	@OneToMany(
		() => Vote,
		vote => vote.product
	)
	votes!: Vote[];

	@Field(() => [Comment], { nullable: 'itemsAndList' })
	@OneToMany(
		() => Comment,
		comment => comment.product
	)
	comments!: Comment[];

	@ManyToMany(
		() => User,
		user => user.products
	)
	@Field(() => [User], { nullable: true })
	makers!: User[];

	@ManyToOne(() => User, {
		onDelete: 'SET NULL'
	})
	@Field(() => User)
	poster!: User;
	@Column({ nullable: true })
	posterId?: number;

	@Column({ type: 'float', default: 0.0 })
	score!: number;
}

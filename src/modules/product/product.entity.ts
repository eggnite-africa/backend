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
	JoinColumn
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

	@Field(() => String, { nullable: true })
	@Column('text', { nullable: true })
	description?: string;

	@Field(() => ProductLinks)
	@OneToOne(() => ProductLinks)
	@JoinColumn()
	links!: ProductLinks;
	@Column({ nullable: true })
	linksId?: number;

	@Field(() => Media)
	@Column('json')
	media!: Media;

	@Field(() => [Vote], { nullable: true })
	@OneToMany(
		type => Vote,
		vote => vote.product
	)
	votes!: Vote[];

	@Field(() => [Comment], { nullable: 'itemsAndList' })
	@OneToMany(
		type => Comment,
		comment => comment.product
	)
	comments!: Comment[];

	@ManyToMany(
		type => User,
		user => user.products
	)
	@Field(() => [User], { nullable: true })
	makers!: User[];

	@Column()
	posterId!: number;

	@OneToOne(() => User)
	@JoinColumn()
	@Field(() => User)
	poster!: User;
}

import {
	BaseEntity,
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	ManyToMany
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Length } from 'class-validator';
import { Media } from './dto/media.type';
import { Vote } from '../vote/vote.entity';
import { Comment } from '../comment/comment.entitiy';
import { User } from '../user/user.entity';

@ObjectType()
@Entity()
export class Product extends BaseEntity {
	@Field(type => ID)
	@PrimaryGeneratedColumn()
	readonly id!: number;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@Field(type => String)
	@Column({ type: 'text', unique: true, nullable: false })
	name!: string;

	@Field(type => String)
	@Length(50, 140)
	@Column()
	tagline!: string;

	@Field(type => String, { nullable: true })
	@Column('text', { nullable: true })
	description?: string;

	@Field(type => [String], { nullable: true })
	@Column('simple-array')
	links!: string[];

	@Field(type => Media)
	@Column('json')
	media!: Media;

	@Field(type => [Vote], { nullable: true })
	@OneToMany(
		type => Vote,
		vote => vote.product
	)
	votes!: Vote[];

	@Field(type => [Comment], { nullable: 'itemsAndList' })
	@OneToMany(
		type => Comment,
		comment => comment.product
	)
	comments!: Comment[];

	@ManyToMany(
		type => User,
		user => user.products
	)
	@Field(type => [User], { nullable: true })
	makers!: User[];
}

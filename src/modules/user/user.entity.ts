import { ObjectType, ID, Field } from 'type-graphql';

import {
	Entity,
	BaseEntity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	ManyToMany,
	JoinTable
} from 'typeorm';
import { Comment } from '../comment/comment.entitiy';
import { Vote } from '../vote/vote.entity';
import { Product } from '../product/product.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Notification } from '../notification/notification.entity';

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@Field(type => ID)
	@PrimaryGeneratedColumn()
	readonly id!: number;

	@Field(type => String)
	@Column({ unique: true })
	@IsNotEmpty()
	username!: string;

	@Field(type => String)
	@Column({ unique: true })
	@IsEmail()
	@IsNotEmpty()
	email!: string;

	@Column()
	@IsNotEmpty()
	password!: string;

	@Column({ nullable: true, default: null, type: 'varchar' })
	passwordResetToken?: string | null;

	@Column({ nullable: true, default: null, type: 'bigint' })
	passwordTokenExpiration?: number | null;

	@Field(type => [Comment], { nullable: 'itemsAndList' })
	@OneToMany(
		type => Comment,
		comment => comment.user
	)
	comments?: Comment[];

	@Field(type => [Vote], { nullable: 'itemsAndList' })
	@OneToMany(
		type => Vote,
		vote => vote.userId
	)
	votes?: Vote[];

	@Field(type => [Product], { nullable: 'itemsAndList' })
	@ManyToMany(
		type => Product,
		product => product.makers
	)
	@JoinTable()
	products?: Product[];

	@Field(type => [Notification], { nullable: 'itemsAndList' })
	@ManyToMany(
		type => Notification,
		notification => notification.subscribers
	)
	@JoinTable()
	notifications?: Notification[];
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, ID, Field } from 'type-graphql';

import {
	Entity,
	BaseEntity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	ManyToMany,
	JoinTable,
	OneToOne,
	JoinColumn,
	CreateDateColumn,
	UpdateDateColumn
} from 'typeorm';
import { Comment } from '../comment/comment.entitiy';
import { Vote } from '../vote/vote.entity';
import { Product } from '../product/product.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Notification } from '../notification/notification.entity';
import { Profile } from '../profile/profile.entity';

@ObjectType()
@Entity()
export class User extends BaseEntity {
	@CreateDateColumn()
	readonly createdAt!: Date;

	@UpdateDateColumn()
	readonly updatedAt!: Date;

	@Field(() => ID)
	@PrimaryGeneratedColumn()
	readonly id!: number;

	@Field(() => String)
	@Column({ unique: true })
	@IsNotEmpty()
	username!: string;

	@Field(() => String)
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

	@Field(() => Profile)
	@OneToOne(() => Profile, {
		onDelete: 'CASCADE'
	})
	@JoinColumn()
	profile!: Profile;
	@Column()
	profileId!: number;

	@Field(() => [Comment], { nullable: 'itemsAndList' })
	@OneToMany(
		() => Comment,
		comment => comment.user
	)
	comments?: Comment[];

	@Field(() => [Vote], { nullable: 'itemsAndList' })
	@OneToMany(
		() => Vote,
		vote => vote.userId
	)
	votes?: Vote[];

	@Field(() => [Product], { nullable: 'itemsAndList' })
	@ManyToMany(
		() => Product,
		product => product.makers
	)
	@JoinTable()
	products?: Product[];

	@Field(() => [Notification], { nullable: 'itemsAndList' })
	@ManyToMany(
		() => Notification,
		notification => notification.subscribers
	)
	@JoinTable()
	notifications?: Notification[];
}

/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, ID, Field, registerEnumType } from 'type-graphql';

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
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Notification } from '../notification/notification.entity';
import { Profile } from '../profile/profile.entity';
import { Competition } from '../competition/competition.entity';

export enum userTypeEnum {
	ADMIN = 'ADMIN',
	USER = 'USER',
	MAKER = 'MAKER'
}

registerEnumType(userTypeEnum, {
	name: 'userTypeEnum'
});

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

	@Field(() => String, { nullable: true })
	@Column({ unique: true, nullable: true })
	@IsEmail()
	email!: string;

	@Column()
	@IsNotEmpty()
	password!: string;

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

	@Column({ type: 'enum', enum: userTypeEnum, default: userTypeEnum.USER })
	@Field(() => userTypeEnum, { defaultValue: userTypeEnum.USER })
	type!: userTypeEnum;

	@Column({ type: 'float', default: 0.0 })
	score!: number;

	@ManyToMany(
		() => Competition,
		competition => competition.jury,
		{
			onDelete: 'SET NULL'
		}
	)
	@ManyToMany(
		() => Competition,
		competition => competition.moderators,
		{
			onDelete: 'SET NULL'
		}
	)
	competitions?: Competition[];
}

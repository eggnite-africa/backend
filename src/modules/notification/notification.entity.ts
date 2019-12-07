import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	Column,
	OneToOne,
	JoinColumn,
	ManyToMany
} from 'typeorm';
import { User } from '../user/user.entity';
import { Vote } from '../vote/vote.entity';
import { Comment } from '../comment/comment.entitiy';
import { ObjectType, ID, Field, registerEnumType } from 'type-graphql';

export enum NotificationType {
	VOTE = 'vote',
	COMMENT = 'comment'
}

registerEnumType(NotificationType, {
	name: 'NotificationType',
	description: 'This is needed to inform FE.'
});
@ObjectType()
@Entity()
export class Notification extends BaseEntity {
	@Field(type => ID)
	@PrimaryGeneratedColumn()
	readonly id!: number;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updateAt!: Date;

	@Field(type => Boolean)
	@Column({ default: false })
	seen!: boolean;

	@ManyToMany(
		type => User,
		user => user.notifications
	)
	subscribers!: User[];
	@Column()
	userId!: number;

	@OneToOne(type => Vote, {
		onDelete: 'CASCADE'
	})
	@JoinColumn()
	vote?: Vote;
	@Column({ nullable: true })
	@Field(type => ID, { nullable: true })
	voteId?: number;

	@OneToOne(type => Comment, {
		onDelete: 'CASCADE'
	})
	@JoinColumn()
	comment?: Comment;
	@Column({ nullable: true })
	@Field(type => ID, { nullable: true })
	commentId?: number;

	@Field(type => NotificationType)
	@Column({
		type: 'enum',
		enum: NotificationType
	})
	type!: NotificationType;
}

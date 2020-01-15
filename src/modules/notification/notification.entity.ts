import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
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
@Entity({
	orderBy: {
		createdAt: 'DESC'
	}
})
export class Notification extends BaseEntity {
	@Field(() => ID)
	@PrimaryGeneratedColumn()
	readonly id!: number;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updateAt!: Date;

	@Field(() => Boolean)
	@Column({ default: false })
	seen!: boolean;

	@ManyToMany(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		type => User,
		user => user.notifications
	)
	subscribers!: User[];
	@Column()
	userId!: number;

	@Field(() => Vote, { nullable: true })
	@OneToOne(() => Vote, {
		onDelete: 'CASCADE'
	})
	@JoinColumn()
	vote?: Vote;
	@Column({ nullable: true })
	@Field(() => ID, { nullable: true })
	voteId?: number;

	@Field(() => Comment, { nullable: true })
	@OneToOne(() => Comment, {
		onDelete: 'CASCADE'
	})
	@JoinColumn()
	comment?: Comment;
	@Column({ nullable: true })
	@Field(() => ID, { nullable: true })
	commentId?: number;

	@Field(() => NotificationType)
	@Column({
		type: 'enum',
		enum: NotificationType
	})
	type!: NotificationType;
}

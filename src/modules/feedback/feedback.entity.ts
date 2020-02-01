import {
	Entity,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
	PrimaryGeneratedColumn,
	ManyToOne,
	Column
} from 'typeorm';
import { ObjectType, Field, ID, registerEnumType } from 'type-graphql';
import { User } from '../user/user.entity';

export enum FeedbackType {
	BUG = 'BUG',
	FEATURE = 'FEATURE',
	OTHER = 'OTHER'
}

export enum FeedbackStatus {
	DONE = 'DONE',
	PENDING = 'PENDING',
	REFUSED = 'REFUSED'
}

registerEnumType(FeedbackType, {
	name: 'FeedbackType'
});

registerEnumType(FeedbackStatus, {
	name: 'FeedbackStatus'
});

@Entity()
@ObjectType()
export class Feedback extends BaseEntity {
	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@PrimaryGeneratedColumn()
	@Field(() => ID)
	readonly id!: number;

	@ManyToOne(() => User, { cascade: true, onDelete: 'SET NULL' })
	user!: User;
	@Column({ nullable: true })
	@Field(() => ID, { nullable: true })
	userId?: number;

	@Column({
		type: 'enum',
		enum: FeedbackType
	})
	@Field(() => FeedbackType)
	type!: FeedbackType;

	@Column()
	@Field(() => String)
	content!: string;

	@Column({ type: 'enum', enum: FeedbackStatus })
	@Field(() => FeedbackStatus)
	status!: FeedbackStatus;

	@Column({ nullable: true })
	@Field(() => String, { nullable: true })
	note!: string;
}

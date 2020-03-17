import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne
} from 'typeorm';
import { ObjectType, ID, Field } from 'type-graphql';
import { User } from '../user/user.entity';

@Entity()
@ObjectType()
export class Pitch extends BaseEntity {
	@PrimaryGeneratedColumn()
	@Field(() => ID)
	readonly id!: number;

	@Field(() => String)
	@Column({
		unique: true
	})
	title!: string;

	@Field(() => String)
	@Column()
	content!: string;

	@Field(() => User)
	@ManyToOne(
		() => User,
		user => user.pitch
	)
	user!: User;
}

import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	Column
} from 'typeorm';
import { ObjectType, Field, registerEnumType } from 'type-graphql';
import { IsNotEmpty, IsDate } from 'class-validator';

export enum OccupationType {
	STUDENT = 'STUDENT',
	DEV = 'DEV',
	ENTREPRENEUR = 'ENTREPRENEUR'
}
registerEnumType(OccupationType, {
	name: 'OccupationType'
});

export enum genderType {
	MALE = 'MALE',
	FEMALE = 'FEMALE'
}
registerEnumType(genderType, {
	name: 'genderType'
});

@ObjectType()
@Entity()
export class Profile extends BaseEntity {
	@PrimaryGeneratedColumn()
	readonly id!: number;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	@Field(() => String)
	@Column()
	profilePicture!: string;

	@Field(() => String)
	@Column()
	@IsNotEmpty()
	firstName!: string;

	@Field(() => String)
	@Column()
	@IsNotEmpty()
	lastName!: string;

	@Field(() => genderType)
	@Column({ type: 'enum', enum: genderType })
	gender!: genderType;

	@Field(() => Date, { nullable: true })
	@Column({ nullable: true })
	@IsDate()
	birthDate?: Date;

	@Field(() => OccupationType)
	@Column({
		type: 'enum',
		enum: OccupationType,
		default: OccupationType.STUDENT
	})
	occupation!: OccupationType;

	@Field(() => String, { nullable: true })
	@Column({ nullable: true })
	university?: string;

	@Field(() => String, { nullable: true })
	@Column({ nullable: true })
	bio?: string;

	@Field(() => [String], { nullable: 'itemsAndList' })
	@Column({ nullable: true, type: 'simple-array' })
	socialLinks?: string[];
}

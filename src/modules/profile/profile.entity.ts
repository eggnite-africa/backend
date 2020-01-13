import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	Column
} from 'typeorm';
import { ObjectType, Field, registerEnumType } from 'type-graphql';
import { IsNotEmpty, IsDate, IsFQDN } from 'class-validator';

export enum OccupationType {
	STUDENT = 'STUDENT',
	DEV = 'DEV',
	ENTREPRENEUR = 'ENTREPRENEUR'
}
registerEnumType(OccupationType, {
	name: 'OccupationType'
});

export enum SexType {
	MALE = 'MALE',
	FEMALE = 'FEMALE'
}
registerEnumType(SexType, {
	name: 'SexType'
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
	@IsFQDN()
	profilePicture!: string;

	@Field(() => String)
	@Column()
	@IsNotEmpty()
	firstName!: string;

	@Field(() => String)
	@Column()
	@IsNotEmpty()
	lastName!: string;

	@Field(() => SexType)
	@Column({ type: 'enum', enum: SexType })
	sex!: SexType;

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

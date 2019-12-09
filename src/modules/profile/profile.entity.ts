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

	@Field(type => String)
	@Column()
	@IsNotEmpty()
	firstName!: string;

	@Field(type => String)
	@Column()
	@IsNotEmpty()
	lastName!: string;

	@Field(type => SexType)
	@Column({ type: 'enum', enum: SexType })
	sex!: SexType;

	@Field(type => Date, { nullable: true })
	@Column({ nullable: true })
	@IsDate()
	birthDate?: Date;

	@Field(type => OccupationType)
	@Column({
		type: 'enum',
		enum: OccupationType,
		default: OccupationType.STUDENT
	})
	occupation!: OccupationType;

	@Field(type => String, { nullable: true })
	@Column({ nullable: true })
	university?: string;

	@Field(type => String, { nullable: true })
	@Column({ nullable: true })
	bio?: string;
}

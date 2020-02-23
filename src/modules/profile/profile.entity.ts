import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	Column
} from 'typeorm';
import { ObjectType, Field, registerEnumType } from 'type-graphql';
import { IsNotEmpty, IsDate, IsOptional, IsString } from 'class-validator';

export enum OccupationType {
	STUDENT = 'STUDENT',
	DEVELOPER = 'DEVELOPER',
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

	@Field(() => String, { nullable: true })
	@Column({ nullable: true })
	@IsString()
	@IsOptional()
	profilePicture?: string;

	@Field(() => String)
	@Column({ default: '' })
	@IsNotEmpty()
	fullName!: string;

	@Field(() => genderType, { nullable: true })
	@Column({ type: 'enum', enum: genderType, nullable: true })
	@IsOptional()
	gender?: genderType;

	@Field(() => Date, { nullable: true })
	@Column({ nullable: true })
	@IsDate()
	@IsOptional()
	birthDate?: Date;

	@Field(() => OccupationType, { nullable: true })
	@Column({
		type: 'enum',
		enum: OccupationType,
		default: OccupationType.STUDENT,
		nullable: true
	})
	@IsOptional()
	occupation?: OccupationType;

	@Field(() => String, { nullable: true })
	@Column({ nullable: true })
	@IsOptional()
	university?: string;

	@Field(() => String, { nullable: true })
	@Column({ nullable: true })
	@IsOptional()
	company?: string;

	@Field(() => String, { nullable: true })
	@Column({ nullable: true })
	@IsOptional()
	bio?: string;

	@Field(() => String)
	@Column()
	country!: string;

	@Field(() => [String], { nullable: 'itemsAndList' })
	@Column({ nullable: true, type: 'simple-array' })
	@IsOptional()
	socialLinks?: string[];
}

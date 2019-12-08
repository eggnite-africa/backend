import {
	BaseEntity,
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	Column
} from 'typeorm';
import { ObjectType, Field, registerEnumType } from 'type-graphql';

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
	firstName!: string;

	@Field(type => String)
	@Column()
	lastName!: string;

	@Field(type => SexType)
	@Column({ type: 'enum', enum: SexType })
	sex!: SexType;

	@Field(type => Date, { nullable: true })
	@Column({ nullable: true })
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

import {
	BaseEntity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn
} from 'typeorm';

export class Competition extends BaseEntity {
	@PrimaryGeneratedColumn()
	readonly id!: number;

	@CreateDateColumn()
	readonly createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}

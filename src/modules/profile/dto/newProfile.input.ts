import { Profile, genderType, OccupationType } from '../profile.entity';
import { InputType, Field } from 'type-graphql';
import {
	IsNotEmpty,
	IsDateString,
	IsEnum,
	IsString,
	IsOptional
} from 'class-validator';
@InputType()
export class ProfileInput implements Partial<Profile> {
	@Field(() => String, { nullable: true })
	@IsString()
	@IsOptional()
	picture?: string;

	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	fullName!: string;

	@Field(() => genderType, { nullable: true })
	@IsEnum(genderType)
	gender?: genderType;

	@Field(() => Date, { nullable: true })
	@IsDateString()
	@IsOptional()
	birthDate?: Date;

	@Field(() => OccupationType, { nullable: true })
	@IsEnum(OccupationType)
	@IsOptional()
	occupation?: OccupationType;

	@Field(() => String, { nullable: true })
	@IsString()
	@IsOptional()
	bio?: string;

	@Field(() => [String], { nullable: 'itemsAndList' })
	@IsString({ each: true })
	@IsOptional({ each: true })
	socialLinks?: string[];

	@Field(() => String, { nullable: true })
	@IsString()
	@IsOptional()
	university?: string;

	@Field(() => String, { nullable: true })
	@IsString()
	@IsOptional()
	company?: string;

	@Field(() => String)
	@IsString()
	country!: string;
}

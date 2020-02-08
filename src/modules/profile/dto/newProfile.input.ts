import { Profile, SexType, OccupationType } from '../profile.entity';
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
	profilePicture?: string;

	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	firstName!: string;

	@Field(() => String)
	@IsString()
	@IsNotEmpty()
	lastName!: string;

	@Field(() => SexType)
	@IsEnum(SexType)
	sex!: SexType;

	@Field(() => Date, { nullable: true })
	@IsDateString()
	@IsOptional()
	birthDate?: Date;

	@Field(() => OccupationType)
	@IsEnum(OccupationType)
	occupation!: OccupationType;

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
}

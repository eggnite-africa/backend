import { Profile, SexType, OccupationType } from '../profile.entity';
import { InputType, Field } from 'type-graphql';
import {
	IsDateString,
	IsString,
	IsEnum,
	IsFQDN,
	IsOptional
} from 'class-validator';

@InputType()
export class UpdateProfileInput implements Partial<Profile> {
	@Field(() => String, { nullable: true })
	@IsFQDN()
	@IsOptional()
	profilePicture?: string;

	@Field(() => String, { nullable: true })
	@IsString()
	@IsOptional()
	firstName?: string;

	@Field(() => String, { nullable: true })
	@IsString()
	@IsOptional()
	lastName?: string;

	@Field(() => SexType, { nullable: true })
	@IsEnum(SexType)
	@IsOptional()
	sex?: SexType;

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
	@IsOptional()
	socialLinks?: string[];

	@Field(() => String, { nullable: true })
	@IsString()
	@IsOptional()
	university?: string;
}

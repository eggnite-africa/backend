import { Profile, genderType, OccupationType } from '../profile.entity';
import { InputType, Field } from 'type-graphql';
import { IsString, IsEnum, IsOptional, IsDate } from 'class-validator';

@InputType()
export class UpdateProfileInput implements Partial<Profile> {
	@Field(() => String, { nullable: true })
	@IsString()
	@IsOptional()
	picture?: string;

	@Field(() => String)
	@IsString()
	@IsOptional()
	fullName?: string;

	@Field(() => genderType, { nullable: true })
	@IsEnum(genderType)
	@IsOptional()
	gender?: genderType;

	@Field(() => Date, { nullable: true })
	@IsDate()
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

	@Field(() => String, { nullable: true })
	@IsString()
	@IsOptional()
	company?: string;

	@Field(() => String, { nullable: true })
	@IsString()
	@IsOptional()
	country?: string;
}

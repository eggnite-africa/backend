import { InputType, Field } from 'type-graphql';
import { User, userTypeEnum } from '../user.entity';
import {
	IsEmail,
	IsNotEmpty,
	MinLength,
	IsEnum,
	IsOptional,
	IsAlphanumeric
} from 'class-validator';
import { ProfileInput } from '../../profile/dto/newProfile.input';
@InputType()
export class UserInput implements Partial<User> {
	@Field(() => String)
	@MinLength(2)
	@IsAlphanumeric()
	username!: string;

	@Field(() => String, { nullable: true })
	@IsEmail()
	@IsOptional()
	email?: string;

	@Field(() => String)
	@IsNotEmpty()
	password!: string;

	@Field(() => ProfileInput)
	// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
	// @ts-ignore
	profile!: ProfileInput;

	@Field(() => userTypeEnum)
	@IsEnum(userTypeEnum)
	type: userTypeEnum = userTypeEnum.USER;
}

import { InputType, Field } from 'type-graphql';
import { User, userTypeEnum } from '../user.entity';
import {
	IsEmail,
	IsNotEmpty,
	MinLength,
	IsEnum,
	IsAlphanumeric
} from 'class-validator';
import { NewProfileInput } from '../../profile/dto/newProfile.input';
@InputType()
export class NewUserInput implements Partial<User> {
	@Field(() => String)
	@MinLength(2)
	@IsAlphanumeric()
	username!: string;

	@Field(() => String)
	@IsEmail()
	email!: string;

	@Field(() => String)
	@IsNotEmpty()
	password!: string;

	@Field(() => NewProfileInput)
	// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
	// @ts-ignore
	profile!: NewProfileInput;

	@Field(() => userTypeEnum)
	@IsEnum(userTypeEnum)
	type: userTypeEnum = userTypeEnum.USER;
}

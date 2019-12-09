import { InputType, Field } from 'type-graphql';
import { User } from '../user.entity';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ProfileInput } from '../../profile/dto/newProfile.input';
@InputType()
export class UserInput implements Partial<User> {
	@Field(type => String)
	@MinLength(3)
	username!: string;

	@Field(type => String)
	@IsEmail()
	email!: string;

	@Field(type => String)
	@IsNotEmpty()
	password!: string;

	@Field(type => ProfileInput)
	// @ts-ignore
	profile!: ProfileInput;
}

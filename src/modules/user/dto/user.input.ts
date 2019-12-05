import { InputType, Field } from 'type-graphql';
import { User } from '../user.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';
@InputType()
export class UserInput implements Partial<User> {
	@Field(type => String)
	username!: string;

	@Field(type => String)
	@IsEmail()
	email!: string;

	@Field(type => String)
	@IsNotEmpty()
	password!: string;
}

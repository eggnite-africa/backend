import { InputType, Field } from 'type-graphql';
import { User } from '../user.entity';

@InputType()
export class UserInput implements Partial<User> {
	@Field(type => String)
	username!: string;

	@Field(type => String)
	password!: string;
}

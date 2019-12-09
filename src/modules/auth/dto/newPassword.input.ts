import { InputType, Field } from 'type-graphql';
import { User } from '../../user/user.entity';

@InputType()
export class newPasswordInput implements Partial<User> {
	@Field(type => String)
	resetToken!: string;

	@Field(type => String)
	password!: string;
}

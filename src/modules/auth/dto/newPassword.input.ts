import { InputType, Field } from 'type-graphql';
import { User } from '../../user/user.entity';

@InputType()
export class NewPasswordInput implements Partial<User> {
	@Field(() => String)
	resetToken!: string;

	@Field(() => String)
	password!: string;
}

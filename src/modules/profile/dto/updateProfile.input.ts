import { Profile, SexType, OccupationType } from '../profile.entity';
import { InputType, Field } from 'type-graphql';

@InputType()
export class UpdateProfileInput implements Partial<Profile> {
	@Field(() => String, { nullable: true })
	profilePicture?: string;

	@Field(() => String, { nullable: true })
	firstName?: string;

	@Field(() => String, { nullable: true })
	lastName?: string;

	@Field(() => SexType, { nullable: true })
	sex?: SexType;

	@Field(() => Date, { nullable: true })
	birthDate?: Date;

	@Field(() => OccupationType, { nullable: true })
	occupation?: OccupationType;

	@Field(() => String, { nullable: true })
	bio?: string;

	@Field(() => [String], { nullable: 'itemsAndList' })
	socialLinks?: string[];

	@Field(() => String, { nullable: true })
	university?: string;
}

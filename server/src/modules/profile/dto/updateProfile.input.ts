import { Profile, SexType, OccupationType } from '../profile.entity';
import { InputType, Field } from 'type-graphql';

@InputType()
export class updateProfileInput implements Partial<Profile> {
	@Field(type => String, { nullable: true })
	firstName?: string;

	@Field(type => String, { nullable: true })
	lastName?: string;

	@Field(type => SexType, { nullable: true })
	sex?: SexType;

	@Field(type => Date, { nullable: true })
	birthDate?: Date;

	@Field(type => OccupationType, { nullable: true })
	occupation?: OccupationType;

	@Field(type => String, { nullable: true })
	bio?: string;

	@Field(type => String, { nullable: true })
	university?: string;
}

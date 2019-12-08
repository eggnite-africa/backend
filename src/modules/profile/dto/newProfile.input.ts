import { Profile, SexType, OccupationType } from '../profile.entity';
import { InputType, Field } from 'type-graphql';

@InputType()
export class ProfileInput implements Partial<Profile> {
	@Field(type => String)
	firstName!: string;

	@Field(type => String)
	lastName!: string;

	@Field(type => SexType)
	sex!: SexType;

	@Field(type => Date, { nullable: true })
	birthDate?: Date;

	@Field(type => OccupationType)
	occupation!: OccupationType;

	@Field(type => String, { nullable: true })
	bio?: string;

	@Field(type => String)
	university?: string;
}

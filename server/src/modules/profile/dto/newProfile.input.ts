import { Profile, SexType, OccupationType } from '../profile.entity';
import { InputType, Field } from 'type-graphql';
import { IsNotEmpty } from 'class-validator';
@InputType()
export class ProfileInput implements Partial<Profile> {
	@Field(type => String)
	@IsNotEmpty()
	firstName!: string;

	@Field(type => String)
	@IsNotEmpty()
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

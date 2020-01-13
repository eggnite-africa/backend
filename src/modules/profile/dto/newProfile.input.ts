import { Profile, SexType, OccupationType } from '../profile.entity';
import { InputType, Field } from 'type-graphql';
import { IsNotEmpty, IsFQDN } from 'class-validator';
@InputType()
export class ProfileInput implements Partial<Profile> {
	@Field(() => String)
	@IsFQDN()
	profilePicture!: string;

	@Field(() => String)
	@IsNotEmpty()
	firstName!: string;

	@Field(() => String)
	@IsNotEmpty()
	lastName!: string;

	@Field(() => SexType)
	sex!: SexType;

	@Field(() => Date, { nullable: true })
	birthDate?: Date;

	@Field(() => OccupationType)
	occupation!: OccupationType;

	@Field(() => String, { nullable: true })
	bio?: string;

	@Field(() => [String], { nullable: 'itemsAndList' })
	socialLinks?: string[];

	@Field(() => String)
	university?: string;
}

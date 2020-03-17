import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Pitch } from './pitch.entity';
import { PitchService } from './pitch.service';
import { ID } from 'type-graphql';
import { NewPitchInput } from './dto/newPitch.input';
import { UpdatedPitchInput } from './dto/updatedPitch.input';
// import { CurrentUser } from '../user/decorator/user.decorator';
// import { User } from '../user/user.entity';

@Resolver(() => Pitch)
export class PitchResolver {
	constructor(private readonly pitchService: PitchService) {}

	@Query(() => [Pitch], { nullable: 'itemsAndList' })
	async pitchList(): Promise<Pitch[]> {
		return await this.pitchService.fetchAllPitchs();
	}

	@Query(() => Pitch)
	async pitch(
		@Args({ name: 'id', type: () => ID }) id: number
	): Promise<Pitch> {
		return await this.pitchService.fetchPitchById(id);
	}

	@Mutation(() => Pitch)
	async addPitch(
		@Args({ name: 'newPitch', type: () => NewPitchInput })
		newPitch: NewPitchInput
	): Promise<Pitch> {
		return await this.pitchService.addPitch(newPitch);
	}

	@Mutation(() => Pitch)
	async updatePitch(
		@Args({ name: 'updatedPitch', type: () => UpdatedPitchInput })
		updatedPitch: UpdatedPitchInput,
		@Args({ name: 'userId', type: () => ID }) userId: number
		// @CurrentUser() { id: userId }: User
	): Promise<Pitch> {
		return await this.pitchService.udpatePitch(updatedPitch, userId);
	}

	@Mutation(() => Boolean)
	async deletePitch(
		@Args({ name: 'id', type: () => ID }) id: number,
		@Args({ name: 'userId', type: () => ID }) userId: number
		// @CurrentUser() { id: userId }: User
	): Promise<boolean> {
		return await this.pitchService.deletePitch(id, userId);
	}
}

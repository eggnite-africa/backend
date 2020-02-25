import { InputType, Field } from 'type-graphql';
import { IsFQDN, IsOptional } from 'class-validator';
import { ProductLinks } from '../product-links.entity';

@InputType()
export class NewLinksInput implements Partial<ProductLinks> {
	@Field(() => String, { nullable: true })
	@IsFQDN()
	@IsOptional()
	website?: string;

	@Field(() => String, { nullable: true })
	@IsFQDN()
	@IsOptional()
	github?: string;

	@Field(() => String, { nullable: true })
	@IsFQDN()
	@IsOptional()
	appStore?: string;

	@Field(() => String, { nullable: true })
	@IsFQDN()
	@IsOptional()
	playStore?: string;
}

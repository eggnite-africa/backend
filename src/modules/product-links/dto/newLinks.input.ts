import { InputType, Field } from 'type-graphql';
import { IsFQDN, ValidateIf, IsOptional } from 'class-validator';
import { ProductLinks } from '../product-links.entity';

@InputType()
export class NewLinksInput implements Partial<ProductLinks> {
	@Field(() => String, { nullable: true })
	@ValidateIf(o => !o.github && !o.appStore && !o.playStore)
	@IsFQDN()
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

import { InputType, Field } from 'type-graphql';
import { IsFQDN, IsNotEmpty } from 'class-validator';
import { ProductLinks } from '../product-links.entity';

@InputType()
export class NewLinksInput implements Partial<ProductLinks> {
	@Field(() => String, { nullable: true })
	@IsFQDN()
	website!: string;

	@Field(() => String, { nullable: true })
	@IsFQDN()
	github?: string;

	@Field(() => String, { nullable: true })
	@IsFQDN()
	appStore?: string;

	@Field(() => String, { nullable: true })
	@IsFQDN()
	playStore?: string;
}

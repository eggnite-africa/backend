import { Test, TestingModule } from '@nestjs/testing';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

describe('Product Resolver', () => {
	let resolver: ProductResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ProductService, ProductResolver]
		})
			.overrideProvider(ProductService)
			.useValue(ProductService)
			.compile();

		resolver = module.get<ProductResolver>(ProductResolver);
	});

	test('should be defined', () => {
		expect(resolver).toBeDefined();
	});

	describe('findAll: ', () => {
		test.todo('should return an array of products');
	});
});

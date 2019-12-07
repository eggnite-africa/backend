import { Module, Global } from '@nestjs/common';
import { SharedService } from './shared.service';
import { PubSub } from 'graphql-subscriptions';

@Global()
@Module({
	providers: [
		SharedService,
		{
			provide: 'PUB_SUB',
			useValue: new PubSub()
		}
	],
	exports: [SharedService, 'PUB_SUB']
})
export class SharedModule {}

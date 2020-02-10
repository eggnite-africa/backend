import { config } from 'dotenv';
config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { constants } from './config/constants';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	app.enableCors();
	app.use(helmet());
	app.use(
		rateLimit({
			windowMs: 15 * 60 * 1000, // 15 minutes
			max: 100 // limit each IP to 100 requests per windowMs
		})
	);
	await app.listen(constants.port);
}
bootstrap();

import { config } from 'dotenv';
config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { constants } from './config/constants';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import { Logger } from 'nestjs-pino';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule, {
		cors: true,
		logger: false
	});
	app.useGlobalPipes(new ValidationPipe());
	app.use(helmet());
	app.use(csurf());
	app.use(
		rateLimit({
			windowMs: 15 * 60 * 1000, // 15 minutes
			max: 100 // limit each IP to 100 requests per windowMs
		})
	);
	app.useLogger(app.get(Logger));
	await app.listen(constants.port);
}
bootstrap();

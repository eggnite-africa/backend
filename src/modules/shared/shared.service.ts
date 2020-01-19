/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
const upash = require('upash');

@Injectable()
export class SharedService {
	constructor() {
		if (!upash.list()) {
			upash.install('argon2', require('@phc/argon2'));
		}
	}

	async hashPassword(password: string): Promise<string> {
		return await upash.hash(password);
	}

	async verifyPassword(
		userPassword: string,
		inputPassword: string
	): Promise<boolean> {
		return await upash.verify(userPassword, inputPassword);
	}
}

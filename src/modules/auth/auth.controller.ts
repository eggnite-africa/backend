/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Controller,
	UseGuards,
	Post,
	Request,
	Get,
	Body,
	Delete
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseGuards(AuthGuard('local'))
	@Post('login')
	login(@Request() req: any): string {
		return this.authService.login(req.user);
	}

	@Get('me')
	async getCurrentlyLoggedInUser(
		@Request() req: any
	): Promise<User | undefined> {
		const token = req.get('Authorization').replace('Bearer ', '');
		return this.authService.getCurrentLoggedInUser(token);
	}

	@Delete('logout')
	logout(@Request() req: any): void {
		return this.authService.logout(req);
	}

	@Post('check-password')
	async checkPassword(@Body() { userId, password }: any): Promise<boolean> {
		return await this.authService.checkUserPassword(userId, password);
	}

	@Post('change-email')
	async changeEmail(@Body() { userId, email }: any): Promise<User | undefined> {
		if (!email) return;
		return await this.authService.changeUserEmail(userId, email);
	}

	@Post('change-password')
	async changePassword(
		@Body() { userId, password }: any
	): Promise<User | undefined> {
		if (!password) return;
		return await this.authService.changeUserPassword(userId, password);
	}
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Controller,
	UseGuards,
	Post,
	Request,
	Param,
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
	getCurrentlyLoggedInUser(): User {
		return this.authService.getCurrentLoggedInUser();
	}

	@Delete('logout')
	logout(@Request() req: any): void {
		return this.authService.logout(req);
	}

	@Post('forgot-password')
	async forgotPassword(@Body() email: string): Promise<string> {
		return await this.authService.forgotPassword(email);
	}

	@Post('reset-password')
	async resetPassword(
		@Body() newPassword: string,
		@Param('resetToken') resetToken: string
	): Promise<User> {
		return await this.authService.resetPassword(resetToken, newPassword);
	}
}

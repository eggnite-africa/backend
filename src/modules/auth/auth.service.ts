/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { SharedService } from '../shared/shared.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly sharedService: SharedService
	) {}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	verifyToken(token: string): any {
		return this.jwtService.verify(token);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async validateUser(username: string, pass: string): Promise<any> {
		const user = await this.userService.fetchUserByUsername(username);
		const passwordMatches = await this.sharedService.verifyPassword(
			user.password,
			pass
		);
		if (user && passwordMatches) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	login(user: User): string {
		const payload = {
			sub: user.id,
			username: user.username,
			profileId: user.profileId
		};
		return this.jwtService.sign(payload);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	logout(req: any): void {
		req.logout();
	}

	async getCurrentLoggedInUser(token: string): Promise<User | undefined> {
		const userId = this.jwtService.decode(token)?.['sub'];
		try {
			return await this.userService.fetchUserById(userId);
		} catch (error) {
			return;
		}
	}

	async checkUserPassword(
		userId: number,
		inputPassword: string
	): Promise<boolean> {
		const {
			password: currentPassword
		} = await this.userService.findUserByOptions({ id: userId });
		return await this.sharedService.verifyPassword(
			currentPassword,
			inputPassword
		);
	}

	async changeUserEmail(
		userId: number,
		newEmail: string
	): Promise<User | undefined> {
		const user = await this.userService.findUserByOptions({ id: userId });
		if (newEmail === user.email) return;
		user.email = newEmail;
		return await this.userService.saveUser(user);
	}

	async changeUserPassword(
		userId: number,
		newPassword: string
	): Promise<User | undefined> {
		const user = await this.userService.findUserByOptions({ id: userId });
		const currentPassword = user.password;
		const isSame = await this.sharedService.verifyPassword(
			currentPassword,
			newPassword
		);
		if (isSame) return;
		user.password = await this.sharedService.hashPassword(newPassword);
		return await this.userService.saveUser(user);
	}
}

/* eslint-disable @typescript-eslint/no-var-requires */
import {
	Injectable,
	NotAcceptableException,
	NotFoundException,
	InternalServerErrorException
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import * as nodemailer from 'nodemailer';
import { SharedService } from '../shared/shared.service';
const upash = require('upash');
upash.install('argon2', require('@phc/argon2'));

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

	private async sendForgottenPasswordEmail(
		receiver: User,
		token: string
	): Promise<string> {
		// Generate test SMTP service account from ethereal.email
		// Only needed if you don't have a real mail account for testing
		try {
			const testAccount = await nodemailer.createTestAccount();

			// create reusable transporter object using the default SMTP transport
			const transporter = nodemailer.createTransport({
				host: 'smtp.ethereal.email',
				port: 587,
				secure: false, // true for 465, false for other ports
				auth: {
					user: testAccount.user, // generated ethereal user
					pass: testAccount.pass // generated ethereal password
				}
			});

			// send mail with defined transport object
			const info = await transporter.sendMail({
				from: '"Fred Foo 👻" <foo@example.com>', // sender address
				to: receiver.email, // list of receivers
				subject: 'Password Reset', // Subject line
				text: `Reciever: ${receiver} | Code: ${token}` // plain text body
			});
			// Preview only available when sending through an Ethereal account
			console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

			return 'An email was sent. Please check your inbox';
		} catch (e) {
			throw new InternalServerErrorException(
				'The email was NOT sent. Please try again.'
			);
		}
	}

	async forgotPassword(email: string): Promise<string> {
		const user = await this.userService.findUserByOptions({ email });
		if (user === undefined) {
			throw new NotFoundException('This email does not belong to any account');
		}
		const generatePasswordResetToken = (): string => require('nanoid')();
		const passwordResetToken = generatePasswordResetToken();
		user.passwordResetToken = passwordResetToken;
		user.passwordTokenExpiration = Date.now() + 3600000 * 24;
		this.userService.saveUser(user);
		return await this.sendForgottenPasswordEmail(user, passwordResetToken);
	}

	private async checkResetToken(token: string): Promise<User> {
		const user: User = await this.userService.findUserByOptions({
			passwordResetToken: token
		});
		const tokenExpiration = user.passwordTokenExpiration;
		if (tokenExpiration) {
			const now: number = Date.now();
			const hasExpired: boolean = now > tokenExpiration;
			if (hasExpired) {
				throw new NotAcceptableException('The reset link has expired.');
			}
			return user;
		} else {
			throw new InternalServerErrorException('The reset link is invalid.');
		}
	}

	async resetPassword(token: string, newPassword: string): Promise<User> {
		const user: User | undefined = await this.checkResetToken(token);
		if (user !== undefined) {
			const hashedPassword = await this.sharedService.hashPassword(newPassword);
			user.password = hashedPassword;
			user.passwordResetToken = null;
			user.passwordTokenExpiration = null;
			return await this.userService.saveUser(user);
		} else {
			throw new InternalServerErrorException('The reset link is invalid.');
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

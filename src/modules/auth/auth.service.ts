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

	verifyToken(token: string) {
		return this.jwtService.verify(token);
	}

	async validateUser(username: string, pass: string) {
		const user = await this.userService.fetchUserByUsername(username);
		const passwordMatches = await this.sharedService.verifyPassword(
			user.password,
			pass
		);
		if (user && passwordMatches) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	async login(user: User) {
		const payload = { username: user.username, sub: user.id };
		return {
			access_token: this.jwtService.sign(payload)
		};
	}

	async logout(req: any) {
		req.logout();
		return true;
	}

	private async sendForgottenPasswordEmail(receiver: User, token: string) {
		// Generate test SMTP service account from ethereal.email
		// Only needed if you don't have a real mail account for testing
		try {
			let testAccount = await nodemailer.createTestAccount();

			// create reusable transporter object using the default SMTP transport
			let transporter = nodemailer.createTransport({
				host: 'smtp.ethereal.email',
				port: 587,
				secure: false, // true for 465, false for other ports
				auth: {
					user: testAccount.user, // generated ethereal user
					pass: testAccount.pass // generated ethereal password
				}
			});

			// send mail with defined transport object
			let info = await transporter.sendMail({
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

	async forgotPassword(email: string) {
		const user = await this.userService.findUserByOptions({ email });
		if (user === undefined) {
			throw new NotFoundException('This email does not belong to any account');
		}
		const generatePasswordResetToken = () => require('nanoid')();
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

	async resetPassword(
		token: string,
		newPassword: string,
		req: any
	): Promise<User> {
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
}

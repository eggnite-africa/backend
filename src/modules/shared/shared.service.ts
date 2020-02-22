/* eslint-disable @typescript-eslint/no-var-requires */
import { config } from 'dotenv';
config();
import { Injectable } from '@nestjs/common';
const upash = require('upash');
import AWS = require('aws-sdk');
import nanoid = require('nanoid');

export interface SignedRequest {
	signedUrl: string;
	url: string;
}

@Injectable()
export class SharedService {
	constructor() {
		upash.install('argon2', require('@phc/argon2'));
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

	signS3(fileType: string): SignedRequest {
		const s3 = new AWS.S3();
		const Key = nanoid();
		const s3Params = {
			Bucket: process.env.S3_BUCKET,
			Key,
			ContentType: fileType,
			Expires: 60,
			ACL: 'public-read'
		};
		AWS.config.region = process.env.AWS_REGION;
		const signedUrl = s3.getSignedUrl('putObject', s3Params);
		const url = `https://${s3Params.Bucket}.s3.${AWS.config.region}.amazonaws.com/${Key}`;
		return { signedUrl, url };
	}

	deleteFile(link: string): void {
		if (!link) return;
		const Key = link.split('.com/')[1].split('.')[0];
		const s3 = new AWS.S3();
		const s3Params = {
			Bucket: process.env.S3_BUCKET || '',
			Key
		};
		AWS.config.region = process.env.AWS_REGION;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		s3.deleteObject(s3Params, (err, _) => {
			if (err) throw Error(`There was a problem deleting file: ${Key}`);
		});
	}
}

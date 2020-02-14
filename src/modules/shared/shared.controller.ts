require('dotenv').config();
import { Controller, Post, Param } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import nanoid = require('nanoid');

@Controller()
export class SharedController {
	@Post('sign-s3')
	signS3(
		@Param('fileName') fileName: string,
		@Param('fileType') fileType: string
	): any {
		const s3 = new S3();
		const Key = nanoid();
		const s3Params = {
			Bucket: process.env.S3_BUCKET,
			Key,
			ContentType: fileType,
			Expires: 60,
			ACL: 'public-read',
			Region: process.env.S3_REGION
		};
		s3.getSignedUrl('putObject', s3Params, (err, signedRequest) => {
			if (err) {
				throw Error('there was a problem signing the url');
			}
			return {
				signedRequest,
				url: `https://${s3Params.Bucket}.s3.amazonaws.com/${s3Params.Key}`
			};
		});
	}
}

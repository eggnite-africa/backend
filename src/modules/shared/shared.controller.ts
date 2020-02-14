import { Controller, Post, Body } from '@nestjs/common';
import { SharedService, SignedRequest } from './shared.service';

@Controller()
export class SharedController {
	constructor(private readonly sharedService: SharedService) {}
	@Post('sign-s3')
	signS3(@Body('fileType') fileType: string): SignedRequest {
		return this.sharedService.signS3(fileType);
	}

	@Post('delete-image')
	deleteImage(@Body('link') link: string): void {
		return this.sharedService.deleteFile(link);
	}
}

import { Controller, Post, Body } from '@nestjs/common';
import { SharedService } from './shared.service';

@Controller()
export class SharedController {
	constructor(private readonly sharedService: SharedService) {}
	@Post('sign-s3')
	signS3(@Body('fileType') fileType: string): any {
		return this.sharedService.signS3(fileType);
	}
}

import { createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
	(data, [, , ctx]) => ctx.req.user
);

export const constants = {
	jwtSecretKey: 'secretKey',
	port: process.env.PORT || 4000,
	dbUrl: process.env.DATABASE_URL,
	env: process.env.NODE_ENV || 'developement'
};

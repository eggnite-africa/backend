export const constants = {
	voteAdded: 'VOTE_ADDED',
	commentAdded: 'COMMENT_ADDED',
	jwtSecretKey: 'secretKey',
	port: process.env.PORT || 4000,
	db: {
		host: process.env.DB_HOST,
		name: process.env.DB_NAME,
		username: process.env.DB_USERNAME,
		password: process.env.DB_PASSWORD
	},
	env: process.env.NODE_ENV || 'developement'
};

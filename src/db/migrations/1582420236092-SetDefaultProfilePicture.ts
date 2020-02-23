import { MigrationInterface, QueryRunner } from 'typeorm';

export class SetDefaultProfilePicture1582420236092
	implements MigrationInterface {
	name = 'SetDefaultProfilePicture1582420236092';

	public async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(
			`ALTER TABLE "profile" ALTER COLUMN "picture" SET NOT NULL`,
			undefined
		);
		await queryRunner.query(
			`ALTER TABLE "profile" ALTER COLUMN "picture" SET DEFAULT 'https://eggnite-assets.s3.eu-west-3.amazonaws.com/default_avatar.svg'`,
			undefined
		);
		await queryRunner.query(
			`UPDATE profile
            SET picture = 'https://eggnite-assets.s3.eu-west-3.amazonaws.com/default_avatar.svg'
            WHERE picture = ''
            `,
			undefined
		);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(
			`ALTER TABLE "profile" ALTER COLUMN "picture" DROP DEFAULT`,
			undefined
		);
		await queryRunner.query(
			`ALTER TABLE "profile" ALTER COLUMN "picture" DROP NOT NULL`,
			undefined
		);
	}
}

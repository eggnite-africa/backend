import { MigrationInterface, QueryRunner } from 'typeorm';

export class UseFullNameColumnOnly1582416002584 implements MigrationInterface {
	name = 'UseFullNameColumnOnly1582416002584';

	public async up(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(
			`ALTER TABLE "profile" ADD "fullName" character varying NOT NULL DEFAULT ''`,
			undefined
		);
		await queryRunner.query(
			`UPDATE "profile"
                SET "fullName" = "firstName" || ' ' || "lastName"
                `,
			undefined
		);
		await queryRunner.query(
			`ALTER TABLE "profile" DROP COLUMN "firstName"`,
			undefined
		);
		await queryRunner.query(
			`ALTER TABLE "profile" DROP COLUMN "lastName"`,
			undefined
		);
	}

	public async down(queryRunner: QueryRunner): Promise<any> {
		await queryRunner.query(
			`ALTER TABLE "profile" DROP COLUMN "fullName"`,
			undefined
		);
		await queryRunner.query(
			`ALTER TABLE "profile" ADD "lastName" character varying NOT NULL`,
			undefined
		);
		await queryRunner.query(
			`ALTER TABLE "profile" ADD "firstName" character varying NOT NULL`,
			undefined
		);
	}
}

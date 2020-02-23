import {MigrationInterface, QueryRunner} from "typeorm";

export class CountryColumnIsNullable1582458943774 implements MigrationInterface {
    name = 'CountryColumnIsNullable1582458943774'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "country" DROP NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "country" SET NOT NULL`, undefined);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class CompetitionAddDateColumns1583597943214 implements MigrationInterface {
    name = 'CompetitionAddDateColumns1583597943214'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "competition" ADD "startDate" TIMESTAMP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "competition" ADD "endDate" TIMESTAMP NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "competition" DROP COLUMN "endDate"`, undefined);
        await queryRunner.query(`ALTER TABLE "competition" DROP COLUMN "startDate"`, undefined);
    }

}

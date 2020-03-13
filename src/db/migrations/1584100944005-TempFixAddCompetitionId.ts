import {MigrationInterface, QueryRunner} from "typeorm";

export class TempFixAddCompetitionId1584100944005 implements MigrationInterface {
    name = 'TempFixAddCompetitionId1584100944005'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product" ADD "competitionId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_4bd25b62669a723d5d77942ef04" FOREIGN KEY ("competitionId") REFERENCES "competition"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_4bd25b62669a723d5d77942ef04"`, undefined);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "competitionId"`, undefined);
    }

}

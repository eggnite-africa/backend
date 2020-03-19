import {MigrationInterface, QueryRunner} from "typeorm";

export class RenamePitchTitleAndAddDate1584611896984 implements MigrationInterface {
    name = 'RenamePitchTitleAndAddDate1584611896984'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "pitch" DROP COLUMN "title"`, undefined);
        await queryRunner.query(`ALTER TABLE "pitch" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "pitch" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "pitch" ADD "name" character varying NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "pitch" DROP COLUMN "name"`, undefined);
        await queryRunner.query(`ALTER TABLE "pitch" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "pitch" DROP COLUMN "createdAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "pitch" ADD "title" character varying NOT NULL`, undefined);
    }

}

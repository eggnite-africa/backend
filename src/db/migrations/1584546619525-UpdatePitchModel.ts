import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatePitchModel1584546619525 implements MigrationInterface {
    name = 'UpdatePitchModel1584546619525'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "pitch" DROP COLUMN "content"`, undefined);
        await queryRunner.query(`ALTER TABLE "pitch" ADD "problem" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "pitch" ADD "solution" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "pitch" ADD "skills" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "pitch" ADD "needs" character varying NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "pitch" DROP COLUMN "needs"`, undefined);
        await queryRunner.query(`ALTER TABLE "pitch" DROP COLUMN "skills"`, undefined);
        await queryRunner.query(`ALTER TABLE "pitch" DROP COLUMN "solution"`, undefined);
        await queryRunner.query(`ALTER TABLE "pitch" DROP COLUMN "problem"`, undefined);
        await queryRunner.query(`ALTER TABLE "pitch" ADD "content" character varying NOT NULL`, undefined);
    }

}

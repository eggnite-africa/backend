import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateFields1582377365592 implements MigrationInterface {
    name = 'UpdateFields1582377365592'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "passwordResetToken"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "passwordTokenExpiration"`, undefined);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "profilePicture" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "gender" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "occupation" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" DROP NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "email" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "occupation" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "gender" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "profilePicture" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "passwordTokenExpiration" bigint`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "passwordResetToken" character varying`, undefined);
    }

}

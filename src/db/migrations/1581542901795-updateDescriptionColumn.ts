import {MigrationInterface, QueryRunner} from "typeorm";

export class updateDescriptionColumn1581542901795 implements MigrationInterface {
    name = 'updateDescriptionColumn1581542901795'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "passwordResetToken" SET DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "passwordTokenExpiration" SET DEFAULT null`, undefined);
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "description" SET NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "description" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "passwordTokenExpiration" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "passwordResetToken" DROP DEFAULT`, undefined);
    }

}

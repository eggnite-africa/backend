import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateTitleColumnForPitch1584549935708 implements MigrationInterface {
    name = 'UpdateTitleColumnForPitch1584549935708'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "pitch" DROP CONSTRAINT "UQ_397070113b14bffd7b1e397d7cf"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "pitch" ADD CONSTRAINT "UQ_397070113b14bffd7b1e397d7cf" UNIQUE ("title")`, undefined);
    }

}

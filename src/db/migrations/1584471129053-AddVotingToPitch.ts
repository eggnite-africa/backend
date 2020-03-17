import {MigrationInterface, QueryRunner} from "typeorm";

export class AddVotingToPitch1584471129053 implements MigrationInterface {
    name = 'AddVotingToPitch1584471129053'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "vote" ADD "pitchId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_f9bff69da3ead23aed1a56821dc"`, undefined);
        await queryRunner.query(`ALTER TABLE "vote" ALTER COLUMN "productId" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_f9bff69da3ead23aed1a56821dc" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_cffd095003bd9beb1150987ac93" FOREIGN KEY ("pitchId") REFERENCES "pitch"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_cffd095003bd9beb1150987ac93"`, undefined);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_f9bff69da3ead23aed1a56821dc"`, undefined);
        await queryRunner.query(`ALTER TABLE "vote" ALTER COLUMN "productId" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_f9bff69da3ead23aed1a56821dc" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "vote" DROP COLUMN "pitchId"`, undefined);
    }

}

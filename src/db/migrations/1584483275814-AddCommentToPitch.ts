import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCommentToPitch1584483275814 implements MigrationInterface {
    name = 'AddCommentToPitch1584483275814'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "comment" ADD "pitchId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_1e9f24a68bd2dcd6390a4008395"`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "productId" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_1e9f24a68bd2dcd6390a4008395" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_92af0da51018df9ca73bb4fab05" FOREIGN KEY ("pitchId") REFERENCES "pitch"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_92af0da51018df9ca73bb4fab05"`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_1e9f24a68bd2dcd6390a4008395"`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "productId" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_1e9f24a68bd2dcd6390a4008395" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "pitchId"`, undefined);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class NullableProductLinks1582593931266 implements MigrationInterface {
    name = 'NullableProductLinks1582593931266'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product_links" ALTER COLUMN "website" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "product_links" ALTER COLUMN "github" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "product_links" ALTER COLUMN "appStore" DROP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "product_links" ALTER COLUMN "playStore" DROP NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "product_links" ALTER COLUMN "playStore" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "product_links" ALTER COLUMN "appStore" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "product_links" ALTER COLUMN "github" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "product_links" ALTER COLUMN "website" SET NOT NULL`, undefined);
    }

}

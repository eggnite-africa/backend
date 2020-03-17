import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPitchTable1584462205481 implements MigrationInterface {
    name = 'AddPitchTable1584462205481'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "pitch" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "userId" integer, CONSTRAINT "UQ_397070113b14bffd7b1e397d7cf" UNIQUE ("title"), CONSTRAINT "PK_8174512e26c5adb6879b299f3e6" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "pitch" ADD CONSTRAINT "FK_8da47bd5a6c860045fa53911b68" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "pitch" DROP CONSTRAINT "FK_8da47bd5a6c860045fa53911b68"`, undefined);
        await queryRunner.query(`DROP TABLE "pitch"`, undefined);
    }

}

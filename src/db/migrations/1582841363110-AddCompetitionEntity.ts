import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCompetitionEntity1582841363110 implements MigrationInterface {
    name = 'AddCompetitionEntity1582841363110'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "competition" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "logo" character varying, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "UQ_4235f333ca8098d3693049ab827" UNIQUE ("name"), CONSTRAINT "PK_a52a6248db574777b226e9445bc" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "competition_moderators_user" ("competitionId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_e8990b6d68e04a469229b8d759c" PRIMARY KEY ("competitionId", "userId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_25eab3ab485a21ef3bfd534c4b" ON "competition_moderators_user" ("competitionId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_6350da92420cd35557cd784ab0" ON "competition_moderators_user" ("userId") `, undefined);
        await queryRunner.query(`CREATE TABLE "competition_jury_user" ("competitionId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_9ce0bbf83419f80fd4b8e75c61f" PRIMARY KEY ("competitionId", "userId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_6f6708f74ceceffd7d0c9e134e" ON "competition_jury_user" ("competitionId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_97c8167a2f8b0219b91177e000" ON "competition_jury_user" ("userId") `, undefined);
        await queryRunner.query(`ALTER TABLE "product" ADD "competitionId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_4bd25b62669a723d5d77942ef04" FOREIGN KEY ("competitionId") REFERENCES "competition"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "competition_moderators_user" ADD CONSTRAINT "FK_25eab3ab485a21ef3bfd534c4bc" FOREIGN KEY ("competitionId") REFERENCES "competition"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "competition_moderators_user" ADD CONSTRAINT "FK_6350da92420cd35557cd784ab05" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "competition_jury_user" ADD CONSTRAINT "FK_6f6708f74ceceffd7d0c9e134e4" FOREIGN KEY ("competitionId") REFERENCES "competition"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "competition_jury_user" ADD CONSTRAINT "FK_97c8167a2f8b0219b91177e000f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "competition_jury_user" DROP CONSTRAINT "FK_97c8167a2f8b0219b91177e000f"`, undefined);
        await queryRunner.query(`ALTER TABLE "competition_jury_user" DROP CONSTRAINT "FK_6f6708f74ceceffd7d0c9e134e4"`, undefined);
        await queryRunner.query(`ALTER TABLE "competition_moderators_user" DROP CONSTRAINT "FK_6350da92420cd35557cd784ab05"`, undefined);
        await queryRunner.query(`ALTER TABLE "competition_moderators_user" DROP CONSTRAINT "FK_25eab3ab485a21ef3bfd534c4bc"`, undefined);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_4bd25b62669a723d5d77942ef04"`, undefined);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "competitionId"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_97c8167a2f8b0219b91177e000"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_6f6708f74ceceffd7d0c9e134e"`, undefined);
        await queryRunner.query(`DROP TABLE "competition_jury_user"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_6350da92420cd35557cd784ab0"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_25eab3ab485a21ef3bfd534c4b"`, undefined);
        await queryRunner.query(`DROP TABLE "competition_moderators_user"`, undefined);
        await queryRunner.query(`DROP TABLE "competition"`, undefined);
    }

}

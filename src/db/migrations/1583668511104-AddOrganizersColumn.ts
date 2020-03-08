import {MigrationInterface, QueryRunner} from "typeorm";

export class AddOrganizersColumn1583668511104 implements MigrationInterface {
    name = 'AddOrganizersColumn1583668511104'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "competition" ADD "organizers" json NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "competition" DROP COLUMN "organizers"`, undefined);
    }

}

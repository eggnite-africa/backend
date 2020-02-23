import {MigrationInterface, QueryRunner} from "typeorm";

export class RenameProfilePictureField1582417986333 implements MigrationInterface {
    name = 'RenameProfilePictureField1582417986333'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "profile" RENAME COLUMN "profilePicture" TO "picture"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "profile" RENAME COLUMN "picture" TO "profilePicture"`, undefined);
    }

}

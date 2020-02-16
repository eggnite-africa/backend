import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1581888639221 implements MigrationInterface {
    name = 'InitialMigration1581888639221'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "comment" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "content" text NOT NULL, "productId" integer NOT NULL, "parentId" integer, "userId" integer NOT NULL, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TYPE "notification_type_enum" AS ENUM('vote', 'comment')`, undefined);
        await queryRunner.query(`CREATE TABLE "notification" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "seen" boolean NOT NULL DEFAULT false, "userId" integer NOT NULL, "voteId" integer, "commentId" integer, "type" "notification_type_enum" NOT NULL, CONSTRAINT "REL_8910f599ae02e09e7b42103a8e" UNIQUE ("voteId"), CONSTRAINT "REL_8dcb425fddadd878d80bf5fa19" UNIQUE ("commentId"), CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TYPE "profile_gender_enum" AS ENUM('MALE', 'FEMALE')`, undefined);
        await queryRunner.query(`CREATE TYPE "profile_occupation_enum" AS ENUM('STUDENT', 'DEVELOPER', 'ENTREPRENEUR')`, undefined);
        await queryRunner.query(`CREATE TABLE "profile" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "profilePicture" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "gender" "profile_gender_enum" NOT NULL, "birthDate" TIMESTAMP, "occupation" "profile_occupation_enum" NOT NULL DEFAULT 'STUDENT', "university" character varying, "company" character varying, "bio" character varying, "country" character varying NOT NULL, "socialLinks" text, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TYPE "user_type_enum" AS ENUM('ADMIN', 'USER', 'MAKER')`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "passwordResetToken" character varying DEFAULT null, "passwordTokenExpiration" bigint DEFAULT null, "profileId" integer NOT NULL, "type" "user_type_enum" NOT NULL DEFAULT 'USER', "score" double precision NOT NULL DEFAULT 0, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "REL_9466682df91534dd95e4dbaa61" UNIQUE ("profileId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "vote" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "productId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_2d5932d46afe39c8176f9d4be72" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "product_links" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "website" character varying NOT NULL, "github" character varying NOT NULL, "appStore" character varying NOT NULL, "playStore" character varying NOT NULL, CONSTRAINT "PK_cd044119ad0ebe7ff0ccbb47939" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" text NOT NULL, "tagline" character varying NOT NULL, "description" character varying NOT NULL, "linksId" integer NOT NULL, "media" json NOT NULL, "posterId" integer, "score" double precision NOT NULL DEFAULT 0, CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"), CONSTRAINT "REL_295f2a324bdbd90a9d57b7dda3" UNIQUE ("linksId"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TYPE "feedback_type_enum" AS ENUM('BUG', 'FEATURE', 'OTHER')`, undefined);
        await queryRunner.query(`CREATE TYPE "feedback_status_enum" AS ENUM('DONE', 'PENDING', 'REFUSED')`, undefined);
        await queryRunner.query(`CREATE TABLE "feedback" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "userId" integer, "type" "feedback_type_enum" NOT NULL, "content" character varying NOT NULL, "status" "feedback_status_enum" NOT NULL, "note" character varying, CONSTRAINT "PK_8389f9e087a57689cd5be8b2b13" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user_products_product" ("userId" integer NOT NULL, "productId" integer NOT NULL, CONSTRAINT "PK_31e9c4932027ab0d5b459b4bbe9" PRIMARY KEY ("userId", "productId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_f75a259330a1b34d6c68206b42" ON "user_products_product" ("userId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_8e92508a7e69cb8011f4bbf9b2" ON "user_products_product" ("productId") `, undefined);
        await queryRunner.query(`CREATE TABLE "user_notifications_notification" ("userId" integer NOT NULL, "notificationId" integer NOT NULL, CONSTRAINT "PK_c20252416bdb7d05d0211bd461b" PRIMARY KEY ("userId", "notificationId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_56b86b108a28ba4750417373d9" ON "user_notifications_notification" ("userId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_022bdca3318f2257b5ae15c173" ON "user_notifications_notification" ("notificationId") `, undefined);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_1e9f24a68bd2dcd6390a4008395" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_e3aebe2bd1c53467a07109be596" FOREIGN KEY ("parentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_8910f599ae02e09e7b42103a8e0" FOREIGN KEY ("voteId") REFERENCES "vote"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_8dcb425fddadd878d80bf5fa195" FOREIGN KEY ("commentId") REFERENCES "comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_9466682df91534dd95e4dbaa616" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_f9bff69da3ead23aed1a56821dc" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "vote" ADD CONSTRAINT "FK_f5de237a438d298031d11a57c3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_295f2a324bdbd90a9d57b7dda36" FOREIGN KEY ("linksId") REFERENCES "product_links"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_4bb7081dc2d3587398e18972335" FOREIGN KEY ("posterId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "feedback" ADD CONSTRAINT "FK_4a39e6ac0cecdf18307a365cf3c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_products_product" ADD CONSTRAINT "FK_f75a259330a1b34d6c68206b42f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_products_product" ADD CONSTRAINT "FK_8e92508a7e69cb8011f4bbf9b2e" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_notifications_notification" ADD CONSTRAINT "FK_56b86b108a28ba4750417373d90" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_notifications_notification" ADD CONSTRAINT "FK_022bdca3318f2257b5ae15c1738" FOREIGN KEY ("notificationId") REFERENCES "notification"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_notifications_notification" DROP CONSTRAINT "FK_022bdca3318f2257b5ae15c1738"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_notifications_notification" DROP CONSTRAINT "FK_56b86b108a28ba4750417373d90"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_products_product" DROP CONSTRAINT "FK_8e92508a7e69cb8011f4bbf9b2e"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_products_product" DROP CONSTRAINT "FK_f75a259330a1b34d6c68206b42f"`, undefined);
        await queryRunner.query(`ALTER TABLE "feedback" DROP CONSTRAINT "FK_4a39e6ac0cecdf18307a365cf3c"`, undefined);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_4bb7081dc2d3587398e18972335"`, undefined);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_295f2a324bdbd90a9d57b7dda36"`, undefined);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_f5de237a438d298031d11a57c3b"`, undefined);
        await queryRunner.query(`ALTER TABLE "vote" DROP CONSTRAINT "FK_f9bff69da3ead23aed1a56821dc"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_9466682df91534dd95e4dbaa616"`, undefined);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_8dcb425fddadd878d80bf5fa195"`, undefined);
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_8910f599ae02e09e7b42103a8e0"`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_e3aebe2bd1c53467a07109be596"`, undefined);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_1e9f24a68bd2dcd6390a4008395"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_022bdca3318f2257b5ae15c173"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_56b86b108a28ba4750417373d9"`, undefined);
        await queryRunner.query(`DROP TABLE "user_notifications_notification"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_8e92508a7e69cb8011f4bbf9b2"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_f75a259330a1b34d6c68206b42"`, undefined);
        await queryRunner.query(`DROP TABLE "user_products_product"`, undefined);
        await queryRunner.query(`DROP TABLE "feedback"`, undefined);
        await queryRunner.query(`DROP TYPE "feedback_status_enum"`, undefined);
        await queryRunner.query(`DROP TYPE "feedback_type_enum"`, undefined);
        await queryRunner.query(`DROP TABLE "product"`, undefined);
        await queryRunner.query(`DROP TABLE "product_links"`, undefined);
        await queryRunner.query(`DROP TABLE "vote"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`DROP TYPE "user_type_enum"`, undefined);
        await queryRunner.query(`DROP TABLE "profile"`, undefined);
        await queryRunner.query(`DROP TYPE "profile_occupation_enum"`, undefined);
        await queryRunner.query(`DROP TYPE "profile_gender_enum"`, undefined);
        await queryRunner.query(`DROP TABLE "notification"`, undefined);
        await queryRunner.query(`DROP TYPE "notification_type_enum"`, undefined);
        await queryRunner.query(`DROP TABLE "comment"`, undefined);
    }

}

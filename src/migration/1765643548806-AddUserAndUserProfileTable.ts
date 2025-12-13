import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserAndUserProfileTable1765643548806 implements MigrationInterface {
    name = 'AddUserAndUserProfileTable1765643548806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_tourist_profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "full_name" character varying NOT NULL, "identity_number" character varying NOT NULL, "address" text NOT NULL, "phone_number" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "REL_e2b8285dde70f2ebe8dbe0a5b2" UNIQUE ("user_id"), CONSTRAINT "PK_d69a33b3965c782ac74efe48191" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e2b8285dde70f2ebe8dbe0a5b2" ON "user_tourist_profile" ("user_id") `);
        await queryRunner.query(`CREATE TABLE "user_employee_profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "full_name" character varying NOT NULL, "employee_code" character varying NOT NULL, "phone_number" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "UQ_d1fb634ab71fbccf7347561c05e" UNIQUE ("employee_code"), CONSTRAINT "REL_16ab7c332a309eb65d25910e2e" UNIQUE ("user_id"), CONSTRAINT "PK_22166def777f72de5c89ea47f19" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_16ab7c332a309eb65d25910e2e" ON "user_employee_profile" ("user_id") `);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('tourist', 'admin', 'employee')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'tourist', "is_active" boolean NOT NULL DEFAULT true, "hashedRefreshToken" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_tourist_profile" ADD CONSTRAINT "FK_e2b8285dde70f2ebe8dbe0a5b2c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_employee_profile" ADD CONSTRAINT "FK_16ab7c332a309eb65d25910e2e5" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_employee_profile" DROP CONSTRAINT "FK_16ab7c332a309eb65d25910e2e5"`);
        await queryRunner.query(`ALTER TABLE "user_tourist_profile" DROP CONSTRAINT "FK_e2b8285dde70f2ebe8dbe0a5b2c"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_16ab7c332a309eb65d25910e2e"`);
        await queryRunner.query(`DROP TABLE "user_employee_profile"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e2b8285dde70f2ebe8dbe0a5b2"`);
        await queryRunner.query(`DROP TABLE "user_tourist_profile"`);
    }

}

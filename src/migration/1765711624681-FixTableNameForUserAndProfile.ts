import { MigrationInterface, QueryRunner } from "typeorm";

export class FixTableNameForUserAndProfile1765711624681 implements MigrationInterface {
    name = 'FixTableNameForUserAndProfile1765711624681'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_touritst_profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "full_name" character varying(255) NOT NULL, "identity_number" character varying(255) NOT NULL, "address" text NOT NULL, "phone_number" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "REL_d2103d454279caef6affd6a427" UNIQUE ("user_id"), CONSTRAINT "PK_a5bde6a419d24e9a65f1e8d331a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d2103d454279caef6affd6a427" ON "user_touritst_profile" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_32297baae59520607ed3a31b5a" ON "travel_spot" ("created_at") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_f4d2868779148e41cb10ed3c47" ON "travel_spot" ("name", "city") `);
        await queryRunner.query(`ALTER TABLE "user_touritst_profile" ADD CONSTRAINT "FK_d2103d454279caef6affd6a4279" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_touritst_profile" DROP CONSTRAINT "FK_d2103d454279caef6affd6a4279"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f4d2868779148e41cb10ed3c47"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_32297baae59520607ed3a31b5a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d2103d454279caef6affd6a427"`);
        await queryRunner.query(`DROP TABLE "user_touritst_profile"`);
    }

}

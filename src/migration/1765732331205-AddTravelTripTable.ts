import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTravelTripTable1765732331205 implements MigrationInterface {
    name = 'AddTravelTripTable1765732331205'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "travel_trip" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "notes" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_tourist_id" uuid NOT NULL, "user_employee_id" uuid NOT NULL, "travel_package_id" uuid NOT NULL, CONSTRAINT "PK_39793add15db1aa36faa4237dd2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fd778991771b6a3056c22c3282" ON "travel_trip" ("start_date") `);
        await queryRunner.query(`CREATE INDEX "IDX_6e0855c6fd630a24f383920c0d" ON "travel_trip" ("travel_package_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_a12b0ebcc066b70707a56a2411" ON "travel_trip" ("user_employee_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_c9b726ab70ef1d9449caf78aa5" ON "travel_trip" ("user_tourist_id") `);
        await queryRunner.query(`ALTER TABLE "travel_trip" ADD CONSTRAINT "FK_c9b726ab70ef1d9449caf78aa53" FOREIGN KEY ("user_tourist_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "travel_trip" ADD CONSTRAINT "FK_a12b0ebcc066b70707a56a24118" FOREIGN KEY ("user_employee_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "travel_trip" ADD CONSTRAINT "FK_6e0855c6fd630a24f383920c0d3" FOREIGN KEY ("travel_package_id") REFERENCES "travel_package"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "travel_trip" DROP CONSTRAINT "FK_6e0855c6fd630a24f383920c0d3"`);
        await queryRunner.query(`ALTER TABLE "travel_trip" DROP CONSTRAINT "FK_a12b0ebcc066b70707a56a24118"`);
        await queryRunner.query(`ALTER TABLE "travel_trip" DROP CONSTRAINT "FK_c9b726ab70ef1d9449caf78aa53"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c9b726ab70ef1d9449caf78aa5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a12b0ebcc066b70707a56a2411"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6e0855c6fd630a24f383920c0d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fd778991771b6a3056c22c3282"`);
        await queryRunner.query(`DROP TABLE "travel_trip"`);
    }

}

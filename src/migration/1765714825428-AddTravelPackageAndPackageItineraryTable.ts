import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTravelPackageAndPackageItineraryTable1765714825428 implements MigrationInterface {
    name = 'AddTravelPackageAndPackageItineraryTable1765714825428'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "travel_package" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(255) NOT NULL, "description" text NOT NULL, "country" character varying(100) NOT NULL, "province" character varying(100) NOT NULL, "city" character varying(100) NOT NULL, "basePrice" numeric(15,2) NOT NULL, "duration_days" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e250cbcd67b8101e880821b9c78" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6ee45fe55217478c87fd8e4fba" ON "travel_package" ("created_at") `);
        await queryRunner.query(`CREATE TABLE "package-itinerary" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "day_sequence" integer NOT NULL, "start_time" TIME NOT NULL, "end_time" TIME NOT NULL, "activity_detail" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "travel_package_id" uuid NOT NULL, "spot_id" uuid NOT NULL, CONSTRAINT "PK_bad9049988baf5ea17567e2720c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_cab4f03943d6e9272ae8651095" ON "package-itinerary" ("travel_package_id", "day_sequence") `);
        await queryRunner.query(`CREATE INDEX "IDX_9d2d3c39a531c37362994740b6" ON "package-itinerary" ("spot_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_4b03f75a60b55af44d5b1cf136" ON "package-itinerary" ("travel_package_id") `);
        await queryRunner.query(`ALTER TABLE "package-itinerary" ADD CONSTRAINT "FK_4b03f75a60b55af44d5b1cf1368" FOREIGN KEY ("travel_package_id") REFERENCES "travel_package"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "package-itinerary" ADD CONSTRAINT "FK_9d2d3c39a531c37362994740b6f" FOREIGN KEY ("spot_id") REFERENCES "travel_spot"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "package-itinerary" DROP CONSTRAINT "FK_9d2d3c39a531c37362994740b6f"`);
        await queryRunner.query(`ALTER TABLE "package-itinerary" DROP CONSTRAINT "FK_4b03f75a60b55af44d5b1cf1368"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4b03f75a60b55af44d5b1cf136"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9d2d3c39a531c37362994740b6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cab4f03943d6e9272ae8651095"`);
        await queryRunner.query(`DROP TABLE "package-itinerary"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6ee45fe55217478c87fd8e4fba"`);
        await queryRunner.query(`DROP TABLE "travel_package"`);
    }

}

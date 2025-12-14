import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnCityOnTravelSpotTable1765706116178 implements MigrationInterface {
    name = 'AddColumnCityOnTravelSpotTable1765706116178'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "travel_spot" ADD "city" character varying(100) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "travel_spot" DROP COLUMN "city"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFixedLengthForUserAndProfile1765703526157 implements MigrationInterface {
    name = 'AddFixedLengthForUserAndProfile1765703526157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_employee_profile" DROP COLUMN "full_name"`);
        await queryRunner.query(`ALTER TABLE "user_employee_profile" ADD "full_name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_employee_profile" DROP CONSTRAINT "UQ_d1fb634ab71fbccf7347561c05e"`);
        await queryRunner.query(`ALTER TABLE "user_employee_profile" DROP COLUMN "employee_code"`);
        await queryRunner.query(`ALTER TABLE "user_employee_profile" ADD "employee_code" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_employee_profile" ADD CONSTRAINT "UQ_d1fb634ab71fbccf7347561c05e" UNIQUE ("employee_code")`);
        await queryRunner.query(`ALTER TABLE "user_employee_profile" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "user_employee_profile" ADD "phone_number" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "hashedRefreshToken"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "hashedRefreshToken" character varying(255)`);
        await queryRunner.query(`ALTER TABLE "user_tourist_profile" DROP COLUMN "full_name"`);
        await queryRunner.query(`ALTER TABLE "user_tourist_profile" ADD "full_name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_tourist_profile" DROP COLUMN "identity_number"`);
        await queryRunner.query(`ALTER TABLE "user_tourist_profile" ADD "identity_number" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_tourist_profile" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "user_tourist_profile" ADD "phone_number" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tourist_profile" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "user_tourist_profile" ADD "phone_number" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_tourist_profile" DROP COLUMN "identity_number"`);
        await queryRunner.query(`ALTER TABLE "user_tourist_profile" ADD "identity_number" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_tourist_profile" DROP COLUMN "full_name"`);
        await queryRunner.query(`ALTER TABLE "user_tourist_profile" ADD "full_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "hashedRefreshToken"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "hashedRefreshToken" character varying`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user_employee_profile" DROP COLUMN "phone_number"`);
        await queryRunner.query(`ALTER TABLE "user_employee_profile" ADD "phone_number" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_employee_profile" DROP CONSTRAINT "UQ_d1fb634ab71fbccf7347561c05e"`);
        await queryRunner.query(`ALTER TABLE "user_employee_profile" DROP COLUMN "employee_code"`);
        await queryRunner.query(`ALTER TABLE "user_employee_profile" ADD "employee_code" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user_employee_profile" ADD CONSTRAINT "UQ_d1fb634ab71fbccf7347561c05e" UNIQUE ("employee_code")`);
        await queryRunner.query(`ALTER TABLE "user_employee_profile" DROP COLUMN "full_name"`);
        await queryRunner.query(`ALTER TABLE "user_employee_profile" ADD "full_name" character varying NOT NULL`);
    }

}

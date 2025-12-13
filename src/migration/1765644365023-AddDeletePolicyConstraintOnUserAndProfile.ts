import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeletePolicyConstraintOnUserAndProfile1765644365023 implements MigrationInterface {
    name = 'AddDeletePolicyConstraintOnUserAndProfile1765644365023'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_tourist_profile" DROP CONSTRAINT "FK_e2b8285dde70f2ebe8dbe0a5b2c"`);
        await queryRunner.query(`ALTER TABLE "user_employee_profile" DROP CONSTRAINT "FK_16ab7c332a309eb65d25910e2e5"`);
        await queryRunner.query(`ALTER TABLE "user_tourist_profile" ADD CONSTRAINT "FK_e2b8285dde70f2ebe8dbe0a5b2c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_employee_profile" ADD CONSTRAINT "FK_16ab7c332a309eb65d25910e2e5" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_employee_profile" DROP CONSTRAINT "FK_16ab7c332a309eb65d25910e2e5"`);
        await queryRunner.query(`ALTER TABLE "user_tourist_profile" DROP CONSTRAINT "FK_e2b8285dde70f2ebe8dbe0a5b2c"`);
        await queryRunner.query(`ALTER TABLE "user_employee_profile" ADD CONSTRAINT "FK_16ab7c332a309eb65d25910e2e5" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_tourist_profile" ADD CONSTRAINT "FK_e2b8285dde70f2ebe8dbe0a5b2c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

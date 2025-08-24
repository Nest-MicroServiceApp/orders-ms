import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1756007347274 implements MigrationInterface {
    name = 'Migrations1756007347274'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "stripeChargeId" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ALTER COLUMN "stripeChargeId" SET NOT NULL`);
    }

}

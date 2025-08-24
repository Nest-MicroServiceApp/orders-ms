import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1742178628168 implements MigrationInterface {
    name = 'Migrations1742178628168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order_item" ("id" SERIAL NOT NULL, "productId" integer NOT NULL, "quantity" integer NOT NULL, "price" double precision NOT NULL, "orderId" integer, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "totoalAmount" double precision NOT NULL DEFAULT '0', "totalItems" integer NOT NULL, "status" character varying NOT NULL DEFAULT 'PENDING', "paid" boolean NOT NULL DEFAULT false, "paidAt" date, "stripeChargeId" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_receipt" ("id" SERIAL NOT NULL, "receiptUrl" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "orderId" integer, CONSTRAINT "REL_6bcc142e76d004e355d733c99a" UNIQUE ("orderId"), CONSTRAINT "PK_fb64d18fa3f587e5c7913e1e708" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_6bcc142e76d004e355d733c99a" ON "order_receipt" ("orderId") `);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_receipt" ADD CONSTRAINT "FK_6bcc142e76d004e355d733c99a0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_receipt" DROP CONSTRAINT "FK_6bcc142e76d004e355d733c99a0"`);
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6bcc142e76d004e355d733c99a"`);
        await queryRunner.query(`DROP TABLE "order_receipt"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "order_item"`);
    }

}

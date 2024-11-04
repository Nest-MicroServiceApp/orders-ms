import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1730694233862 implements MigrationInterface {
    name = 'Migrations1730694233862'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "order_item" ("id" SERIAL NOT NULL, "productId" integer NOT NULL, "quantity" integer NOT NULL, "price" double precision NOT NULL, "orderId" integer, CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" SERIAL NOT NULL, "totoalAmount" double precision NOT NULL DEFAULT '0', "totalItems" integer NOT NULL, "status" character varying NOT NULL DEFAULT 'PENDING', "paid" boolean NOT NULL DEFAULT false, "paidAt" date, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "order_item" ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "order_item"`);
    }

}

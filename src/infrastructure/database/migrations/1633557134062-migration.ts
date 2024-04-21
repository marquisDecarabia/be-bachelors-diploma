import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1633557134062 implements MigrationInterface {
  name = 'migration1633557134062';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "order" ("id" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "userId" character varying NOT NULL, "productId" character varying NOT NULL, "productInfo" character varying NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "product_currency_enum" AS ENUM('USD')`,
    );
    await queryRunner.query(
      `CREATE TYPE "product_status_enum" AS ENUM('available', 'sold', 'unavailable')`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "price" numeric NOT NULL, "currency" "product_currency_enum" NOT NULL, "status" "product_status_enum" NOT NULL, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "wallet_currency_enum" AS ENUM('USD')`,
    );
    await queryRunner.query(
      `CREATE TABLE "wallet" ("id" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "balance" numeric NOT NULL DEFAULT '0', "userId" character varying NOT NULL, "currency" "wallet_currency_enum" NOT NULL, CONSTRAINT "UQ_35472b1fe48b6330cd349709564" UNIQUE ("userId"), CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "wallet"`);
    await queryRunner.query(`DROP TYPE "wallet_currency_enum"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TYPE "product_status_enum"`);
    await queryRunner.query(`DROP TYPE "product_currency_enum"`);
    await queryRunner.query(`DROP TABLE "order"`);
  }
}

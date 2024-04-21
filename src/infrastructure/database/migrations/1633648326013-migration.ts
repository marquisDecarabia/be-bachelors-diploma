import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1633648326013 implements MigrationInterface {
  name = 'migration1633648326013';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."product" ALTER COLUMN "price" TYPE numeric(8,2)`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."wallet" ALTER COLUMN "balance" TYPE numeric(8,2)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."wallet" ALTER COLUMN "balance" TYPE numeric`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."product" ALTER COLUMN "price" TYPE numeric`,
    );
  }
}

import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1716219062449 implements MigrationInterface {
    name = 'migration1716219062449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "userEmail" citext NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "userEmail"`);
    }

}

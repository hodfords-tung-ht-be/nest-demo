import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateTable1638283041682 implements MigrationInterface {
  name = 'updateTable1638283041682';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`restaurants\` DROP COLUMN \`address\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`restaurants\` DROP COLUMN \`description\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`restaurants\` ADD \`description\` text NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`restaurants\` ADD \`address\` varchar(255) NOT NULL`,
    );
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTable1638271996686 implements MigrationInterface {
  name = 'createTable1638271996686';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`restaurants\` (\`id\` int NOT NULL AUTO_INCREMENT, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`description\` text NULL, \`address\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`restaurant_categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`restaurant_id\` int NOT NULL, \`category_id\` int NOT NULL, UNIQUE INDEX \`IDX_bd328522c1774ba2c90c952816\` (\`restaurant_id\`, \`category_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_8b0be371d28245da6e4f4b6187\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`restaurant_categories\` ADD CONSTRAINT \`FK_58d6d92d6ed0c45e64dea538204\` FOREIGN KEY (\`restaurant_id\`) REFERENCES \`restaurants\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`restaurant_categories\` ADD CONSTRAINT \`FK_0614424df3d0d9faf8a79cb49df\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`restaurant_categories\` DROP FOREIGN KEY \`FK_0614424df3d0d9faf8a79cb49df\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`restaurant_categories\` DROP FOREIGN KEY \`FK_58d6d92d6ed0c45e64dea538204\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_8b0be371d28245da6e4f4b6187\` ON \`categories\``,
    );
    await queryRunner.query(`DROP TABLE \`categories\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_bd328522c1774ba2c90c952816\` ON \`restaurant_categories\``,
    );
    await queryRunner.query(`DROP TABLE \`restaurant_categories\``);
    await queryRunner.query(`DROP TABLE \`restaurants\``);
  }
}

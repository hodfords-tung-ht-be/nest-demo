require('dotenv').config();

module.exports = [
  {
    type: 'mysql',
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
    username: process.env.USER,
    password: process.env.PASSWORD,
    synchronize: false,
    logging: true,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/database/migrations/*.js'],
    cli: { migrationsDir: 'src/database/migrations' },
  },
];

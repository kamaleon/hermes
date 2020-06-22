module.exports = {
  dialect: 'postgres',
  host: process.env.POSTGRES_HOSTNAME,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  seederStorage: 'sequelize',
  seederStorageTableName: 'sequelize_data',
  define: {
    tipestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

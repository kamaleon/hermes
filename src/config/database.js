module.exports = {
  dialect: 'postgres',
  host: process.env.POSTGRES_HOSTNAME,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  define: {
    tipestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

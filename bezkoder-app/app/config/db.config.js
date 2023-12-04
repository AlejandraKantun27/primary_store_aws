module.exports = {
  HOST: '3.19.9.167',
  USER: process.env.DB_USER,
  PASSWORD: process.env.MYSQL_ROOT_PASSWORD,
  DB: process.env.DB_NAME,
  port: process.env.PORT_DB,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

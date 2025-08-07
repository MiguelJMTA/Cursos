import config from "@infra/config/env";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(config.database.url, {
  host: config.database.host,
  dialect: "postgres",
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  dialectOptions: {
    charset: "utf8",
  },
  define: {
    timestamps: false,
  },
});

export default  sequelize;
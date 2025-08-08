import { UserModel } from "@infra/database/models/user";
import { TokenVerificationModel } from "@infra/database/models/token_verification";
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
  }
});


UserModel.initialize(sequelize);
TokenVerificationModel.initialize(sequelize);

UserModel.associate({ TokenVerificationModel });
TokenVerificationModel.associate({ UserModel });

export default  sequelize;
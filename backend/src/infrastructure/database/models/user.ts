import { DataTypes, Model, Sequelize } from 'sequelize';
import { IUser } from '@domain/interfaces/user.interface';
import { TokenVerificationModel } from './token_verification';

export class UserModel extends Model<IUser> implements IUser {
  public id!: number;
  public email!: string;
  public password!: string;
  public name!: string;
  public career!: string;
  public semester!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize(sequelize: Sequelize): void {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true
          }
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: false
        },
        name: {
          type: DataTypes.STRING(100),
          allowNull: false
        },
        career: {
          type: DataTypes.STRING(50),
          allowNull: false
        },
        semester: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            min: 1,
            max: 12
          }
        }
      },
      {
        sequelize,
        tableName: 'users',
        timestamps: true,
        underscored: true
      }
    );
  }

  public static associate(models: {
    TokenVerificationModel: typeof TokenVerificationModel
  }): void {
    this.hasMany(models.TokenVerificationModel, {
      foreignKey: 'userId',
      as: 'verificationTokens'
    });
  }
}
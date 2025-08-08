import {
       Model,
       DataTypes,
       Sequelize
} from 'sequelize';
import { ITokenVerification } from '@domain/interfaces/token_verification.interface';
import { UserModel } from './user';

export class TokenVerificationModel extends Model<ITokenVerification> implements ITokenVerification {
       public token!: string;
       public userId!: number;
       public expiresAt!: Date;
       public readonly createdAt!: Date;
       public readonly updatedAt!: Date;

       public static initialize(sequelize: Sequelize): void {
              this.init(
                     {
                            token: {
                                   type: DataTypes.UUID,
                                   defaultValue: DataTypes.UUIDV4,
                                   primaryKey: true
                            },
                            userId: {
                                   type: DataTypes.INTEGER,
                                   allowNull: false,
                            },
                            expiresAt: {
                                   type: DataTypes.DATE,
                                   allowNull: false
                            },
                     },
                     {
                            sequelize,
                            tableName: 'verification_tokens',
                            timestamps: true,
                            underscored: true
                     }
              );
       }

       public static associate(models: {
              UserModel: typeof UserModel
       }): void {
              this.belongsTo(models.UserModel,{
                     foreignKey:'userId',
                     as:'user'
              })
       }
}
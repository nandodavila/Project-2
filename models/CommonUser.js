const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class CommonUser extends Model {}

CommonUser.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userlist_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'userlist',
        key: 'id',
      },
    },
    commonlist_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'commonlist',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'commonuser',
  }
);

module.exports = CommonUser;
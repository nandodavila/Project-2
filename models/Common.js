const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Common extends Model {}
// middleware in brackets later

Common.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  item_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  img_link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  purchase_link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'common',
});
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class CommonList extends Model {};

CommonList.init({
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
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'user',
      key: 'id',
    },
  },
},
{
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'commonlist',
});

module.exports = CommonList;
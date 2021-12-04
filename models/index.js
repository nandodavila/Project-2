const User = require('./User');
const UserList = require('./UserList');
const CommonList = require('./CommonList');
const CommonUser = require('./CommonUser');

User.hasOne(UserList, {
  foreignKey: "user_id"
})

UserList.belongsTo(User, {
  foreignKey: "user_id"
})

CommonList.belongsTo(User, {
  foreignKey: "user_id"
})

User.hasMany(CommonList, {
  foreignKey: "user_id"
})

CommonList.belongsToMany(UserList, {
  through: "commonuser",
  foreignKey: "commonlist_id"
})

UserList.belongsToMany(CommonList, {
  through: "commonuser",
  foreignKey: 'userlist_id'
})

module.exports = { User, CommonList, UserList, CommonUser };
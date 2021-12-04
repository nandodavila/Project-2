const User = require('./User');
const UserList = require('./UserList');
const CommonList = require('./CommonList');

User.hasOne(UserList, {
  foreignKey: "user_id"
});

UserList.belongsTo(User, {
  foreignKey: "user_id"
});

CommonList.belongsTo(User, {
    foreignKey: "user_id"
});

User.hasMany(CommonList, {
    foreignKey: "user_id"
});

UserList.hasMany(CommonList, {
  foreignKey: "common_id"
});

CommonList.hasMany(UserList, {
    foreignKey: "common_id"
});

module.exports = { User, CommonList, UserList };
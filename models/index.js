const User = require('./User');
const List = require('./List');
const Item = require('./Item');
const ListItem = require('./ListItem');

User.hasOne(List, {
  foreignKey: 'user_id',
});

List.belongsTo(User, {
  foreignKey: 'user_id',
});

Item.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Item, {
  foreignKey: 'user_id',
});

Item.belongsToMany(List, {
  through: 'listitem',
  foreignKey: 'item_id',
});

List.belongsToMany(Item, {
  through: 'listitem',
  foreignKey: 'list_id',
});

module.exports = { User, Item, List, ListItem };

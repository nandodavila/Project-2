const sequelize = require('../config/connection');
const UserList = require('../models/UserList');
const User = require('../models/User');
const CommonList = require('../models/CommonList');


const userData = require('./userData.json');
const commonListData = require('./commonListData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const list of commonListData) {
    await CommonList.create({
      ...list,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
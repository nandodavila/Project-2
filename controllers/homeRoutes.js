const router = require('express').Router();
const { User, ListItem, Item, List} = require('../models');
const { Op } = require("sequelize");

router.get('/', async (req, res) => {
  try {
    const itemsData = await Item.findAll({
      include: [
        {
          model: User,
        },
      ],
    });
    const items = itemsData.map((item) => item.get({ plain: true }));

    res.render('homepage', {
      items,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/additem', (req, res) => {
  res.render('additem', {
    logged_in: req.session.logged_in
  });
});

router.get('/login-signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  };

  res.render('login-signup');
});

router.get('/search/:search', async (req, res) => {
  try {
    const userData = await User.findAll({
      where: {
        [Op.or]: [
          { username: req.params.search }, 
          { email: req.params.search }
        ]  
      },
    });

    if (userData.length == 0) {
      return res.status(500).json(err)
    } else {
      const user = userData.map((user) => user.get({ plain: true }))
      res.status(200).json({user})
    };
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile/:username', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.params.username
      },
      include: [
        {
          model: List,
        },
        {
          model: Item,
        }
      ],
    });
    const user = userData.get({ plain: true });

    const itemsData = await Item.findAll({
      include: [
        {
          model: User,
        },
      ],
    });
    const items = itemsData.map((item) => item.get({ plain: true }));

    const listData = await List.findOne({
      where: {
        user_id: user.id
      },
      include: [
        {
          model: User,
        },
        {
          model: Item,
        }
      ],
    });
    const list = listData.get({ plain: true });

    res.render('otheruser', {
      user,
      list,
      items,
      userName: req.params.username,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/updateitem/:id', async (req, res) => {
  try {
    const currentItemsData = await Item.findByPk(req.params.id,{
      include:[{
        model: User,
      }],
    });
    const currentItem = currentItemsData.get({ plain: true });

    res.render('updateitem', {
      currentItem,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// what an authed user sees to update their own list and add items
router.get('/dashboard', async (req, res) => {
  try {
    const itemsData = await Item.findAll({
      include: [
        {
          model: User,
        },
        {
          model: List
        },
      ],
    });
    const items = itemsData.map((item) => item.get({ plain: true }));
    
    const userListData = await Item.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [
        {
          model: User,
        },
        {
          model: List
        },
      ],
    });
    
    const userLists = userListData.map((items) => items.get({ plain: true }));

    const listData = await List.findOne({
      where: {
        user_id: req.session.user_id
      },
      include: [
        {
          model: User,
        },
        {
          model: Item
        }
      ],
    });
    const list = listData.get({ plain: true });
  
    res.render('dashboard', {
      userLists,
      items,
      list,
      logged_in: req.session.logged_in,
      name: req.session.username,
      userid: req.session.user_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
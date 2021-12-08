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
    //Change handlebars file name
    res.render('homepage', {
      items,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/additem', (req, res) => {
  res.render('additem');
});

router.get('/login-signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

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
    console.log(userData.length)
    if (userData.length == 0) {
    } else {
      console.log(userData)
      const user = userData.map((user) => user.get({ plain: true }))
      res.status(200).json({user})
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile/:username', async (req, res) => {
  try {
    const userData = await User.findAll({
    where: {
      username: req.params.username
    },
    include: [
      {
        model: List,
      },
    ],
  });
  const user = userData.map((user) => user.get({ plain: true }));

    const itemsData = await Item.findAll({
      include: [
        {
          model: User,
        },
      ],
    });
    const items = itemsData.map((item) => item.get({ plain: true }));

    
    //Change handlebars file name
    res.render('otheruser', {
      user,
      items,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/updateitem/:id', async (req, res) => {
  console.log("id "+ req.params.id);
  try {
    const currentItemsData = await Item.findByPk(req.params.id);
    const currentItem = currentItemsData.get({ plain: true });
    //Change handlebars file name
    res.render('updateitem', {
      currentItem
    });
  } catch (err) {
    console.log(err);
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
      ],
    })

    const userLists = userListData.map((items) => items.get({ plain: true }));
    //Change handlebars file name
    res.render('dashboard', {
      userLists,
      items,
      logged_in: req.session.logged_in,
      name: req.session.username
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
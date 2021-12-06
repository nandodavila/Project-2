const router = require('express').Router();
const { User, ListItem, Item } = require('../models');

router.get('/:username', async (req, res) => {
  try {
    const userData = await User.findAll({
      where: {
        username: req.params.username
      },
    });
    const user = userData.map((user) => user.get({ plain: true }));
    console.log(user)
    // res.status(200).res.json(user)

    // res.redirect('/login-signup')

    // Might Change handlebars file name
    res.render('otheruser', {
      user,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const itemsData = await Item.findAll();
    const items = itemsData.map((item) => item.get({ plain: true }));
    //Change handlebars file name
    res.render('homepage', {
      items
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/updateitem/:id', async (req, res) => {
  console.log("id "+req.params.id);
  try {
    const currentItemsData = await Item.findByPk(req.params.id, {
      include: [
        {
          model: ListItem,
          attributes: ['name'],
        }
      ]
    });
    const currentItems = currentItemsData.get({ plain: true });
    //Change handlebars file name
    res.render('updateitem', {
      currentItems
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login-signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login-signup');
});

module.exports = router;
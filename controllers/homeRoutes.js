const router = require('express').Router();
const { User, CommonList } = require('../models');


router.get('/', async (req, res) => {
  try {
    const commonListData = await CommonList.findAll({
      include: [
        {
          model: User,
        },
      ],
    });
    const commonLists = commonListData.map((items) => items.get({ plain: true }));
    //Change handlebars file name
    res.render('homepage', {
      commonLists,
      logged_in: req.session.logged_in,
      name: req.session.username
    });
  } catch (err) {
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

router.get('/:username', async (req, res) => {
  try {
    console.log(req.params.username)
    const userData = await User.findAll({
      where: {
        username: req.params.username
      },
    });
    console.log(userData)

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

module.exports = router;
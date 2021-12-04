const router = require('express').Router();
const { User, CommonList } = require('../models');

router.get('/search/:username', async (req, res) => {
  try {
    const userData = await User.findAll({
      where: {
        username: req.params.username
      },
    });

    const user = userData.map((user) => user.get({ plain: true }));

    //Might Change handlebars file name
    res.render('otheruser', {
      user,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const commonListData = await CommonList.findAll();
    const commonList = commonListData.map((item) => item.get({ plain: true }));
    //Change handlebars file name
    res.render('homepage', {
      commonList,
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

module.exports = router;
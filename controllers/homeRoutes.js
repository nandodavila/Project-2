const router = require('express').Router();
const { User } = require('../models');

router.get('/search/user/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);

    const user = userData.map((user) => user.get({ plain: true }));

    //Might Change handlebars file name
    res.render('otheruser', {
      user,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
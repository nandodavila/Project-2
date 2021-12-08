const router = require('express').Router();
const { List, User } = require('../../models');

router.post('/', async (req, res) => {
    try {
  
      const list = await List.create(req.body);
      res.status(200).json(Lists);
  
      } catch (err) {
        console.log("error " +err)
      res.status(400).json(err);
    }
  });

  module.exports = router;
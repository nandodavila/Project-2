const router = require('express').Router();
const { Item } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/' , async (req, res) => {
  try {
    const itemData = await Item.findAll();
    const items = itemData.map((items) => items.get({ plain: true }));
    //Change handlebars file name
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', withAuth , async (req, res) => {
  try {

    const items = await Item.create(req.body, {
      user_id: req.session.user_id
    });
    res.status(200).json(items);

    } catch (err) {
      console.log("error " +err)
    res.status(400).json(err);
  }
});

router.put('/:id',withAuth, async (req, res) => {
  try {
    
    const updateItemItem = await Item.update({
      item_name: req.body.item_name,
      description: req.body.description,
      img_link: req.body.img_link,
      purchase_link: req.body.purchase_link,
      user_id: req.body.user_id
    },
    {
      where: {
        id: req.params.id,
      }
    });
    console.log("list "+ updateItemItem);
    res.status(200).json(updateItemItem);
  } catch (err) {
    console.log("error "+err);
    res.status(400).json(err);
    
  }
});

router.delete('/:id' ,withAuth, async (req, res) => {
  try {
    const itemData = await Item.destroy({
      where: {
        id: req.params.id
      },
    });

    if (!itemData) {
      res.status(404).json({ message: 'No item with this id!' });
      return;
    }

    res.status(200).json(itemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
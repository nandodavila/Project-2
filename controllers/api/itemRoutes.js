const router = require('express').Router();
const { Item, User, List } = require('../../models');
const withAuth = require('../../utils/auth');
const { getInfo } = require('../../utils/iteminfo')

router.get('/' , async (req, res) => {
  try {
    const itemData = await Item.findAll({
      include: [{ model: User },{ model: List }],
    });
    const items = itemData.map((items) => items.get({ plain: true }));

    res.status(200).json(items);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id' , async (req, res) => {
  try {
    const itemData = await Item.findByPk(req.params.id);
    const items = itemData.get({ plain: true });

    res.status(200).json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/', withAuth , async (req, res) => {
  try {
    const {purchase_link, description, item_name, img_link} = req.body

    if (!description || !item_name || !img_link) {
      const {title, info, img} = await getInfo(purchase_link)
      
      if(!description) req.body.description = info
      if(!item_name) req.body.item_name = title
      if(!img_link) req.body.img_link = img
    };

    const items = await Item.create({
      item_name: req.body.item_name,
      description: req.body.description,
      img_link: req.body.img_link,
      purchase_link: req.body.purchase_link,
      user_id: req.session.user_id
    });

    res.status(200).json(items);
  } catch (err) {
    console.error(err)
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
    });

    res.status(200).json(updateItemItem);
  } catch (err) {
    console.error(err);
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
    };

    res.status(200).json(itemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
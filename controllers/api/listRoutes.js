const router = require('express').Router();
const { List, User, Item, ListItem } = require('../../models');

router.get('/' , async (req, res) => {
  try {
    const listData = await List.findAll({
      include: [{ model: User },{ model: Item }],
    });
    const lists = listData.map((lists) => lists.get({ plain: true }));
    //Change handlebars file name
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  /* req.body should look like this...
    {
      user_id:,
      itemIds: [1, 2, 3, 4]
    }
  */
  List.create(req.body)
    .then((list) => {
      if (req.body.itemIds.length) {
        const listItemIdArr = req.body.itemIds.map((item_id) => {
          return {
            item_id,
            list_id: list.id
          };
        });
        return ListItem.bulkCreate(listItemIdArr);
      }
      res.status(200).json(list);
    })
    .then((listItemIds) => res.status(200).json(listItemIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});


module.exports = router;
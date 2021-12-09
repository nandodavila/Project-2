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

router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      user_id:,
      itemIds: [1, 2, 3, 4]
    }
  */
  try {
    const listData = await List.create(req.body, {
      include: [{ model: User },{ model: Item }],
    });
    const lists = listData.get({ plain: true });

    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/add/:id' , async (req, res) => {
  /* req.body should look like this...
    {
      user_id:,
      itemIds: [1, 2, 3, 4]
    }
  */

  // split params to be usable
  const params = req.params.id
  const split = params.split("&")
  const listId = split[0]
  const itemId = split[1]

  try {
    // find users list with listId
    const listData = await List.findByPk(listId, {
      include: [{ model: User },{ model: Item }],
    });
    const list = listData.get({ plain: true });
    console.log(list)
    console.log(list.items)
    // assign variable to existarray and push item

    let existarray

    if (list.items) {
      existarray = list.items
      existarray.push(itemId)
    } else {
      existarray = []
      existarray.push(itemId)
    }
    
    console.log(existarray)
    // make a body for new List
    const newbody = {
      id: list.id,
      user_id: list.user_id,
      items: existarray
    }

    // create new List with newbody
    const updatedList = await List.update(newbody, {
      where: {
        id: listId,
      },
      include: [{ model: User },{ model: Item }],
    })

    // make a body for ListItem
    const listItemBody = {
      list_id: listId,
      item_id: itemId,
    }

    // create new ListItem
    const newListItem = await ListItem.create(listItemBody)

    res.status(200).json(newListItem);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
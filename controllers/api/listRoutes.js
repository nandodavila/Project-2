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
  // req.params.id should look like this,
  // api/list/add/${listId}&${itemId}

  // split req.params.id to be usable
  const params = req.params.id
  const split = params.split("&")
  const listId = split[0]
  const itemId = split[1]

  try {
    // find list with matching listId
    const listData = await List.findByPk(listId, {
      include: [{ model: User },{ model: Item }],
    });
    const list = listData.get({ plain: true });

    // get existing item array and add new itemId to it
    let existarray

    if (list.items) {
      existarray = list.items
      existarray.push(itemId)
    } else {
      existarray = []
      existarray.push(itemId)
    }
    
    // make a body to update List
    const newbody = {
      id: list.id,
      user_id: list.user_id,
      items: existarray
    }

    // update List with body
    const updatedList = await List.update(newbody, {
      where: {
        id: listId,
      },
      include: [{ model: User },{ model: Item }],
    })

    // make a body for new ListItem
    const listItemBody = {
      list_id: listId,
      item_id: itemId,
    }

    // create new ListItem
    const newListItem = await ListItem.create(listItemBody)

    res.status(200).json(newListItem);
  } catch (err) {
    console.error(err)
    res.status(500).json(err);
  }
});

router.put('/delete/:id' , async (req, res) => {
  // req.params.id should look like this,
  // api/list/add/${listId}&${itemId}

  // split req.params.id to be usable
  const params = req.params.id
  const split = params.split("&")
  const listId = split[0]
  const itemId = split[1]

  try {
    // find list with matching listId
    const listData = await List.findByPk(listId, {
      include: [{ model: User },{ model: Item }],
    });
    const list = listData.get({ plain: true });

    // get existing item array and filter to remove itemId
    let filtered

    if (list.items) {
      let existarray = list.items

      // filter existarray to find the id to be removed and return new list
      filtered = existarray.filter(id => id != itemId)
      console.log(filtered)
    } 

    // make a body to update List
    const newbody = {
      id: list.id,
      user_id: list.user_id,
      items: existarray
    }

    // update List with body
    const updatedList = await List.update(newbody, {
      where: {
        id: listId,
      },
      include: [{ model: User },{ model: Item }],
    })

    // destroy ListItem that matches itemId and listId
    const destroyListItem = await ListItem.destroy({
      where: {
        list_id: listId,
        item_id: itemId
      }
    })

    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
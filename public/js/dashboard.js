// const req = require("express/lib/request");

const addItemToList = async (event) => {

    event.preventDefault();
    // event.stopPropagation();

    const item_id = event.target.getAttribute('data-id');
    const list_id = event.target.getAttribute('data-id2');
    console.log(list_id)


    const responsePut = await fetch(`/api/list/add/${list_id}&${item_id}`, {
        method: 'PUT',
        body: JSON.stringify(
            { 
                id: list_id,
                item_id: item_id
            }),        
        headers: { 'Content-Type': 'application/json' },
        });
          console.log(responsePut)
          if (responsePut.ok) {
                document.location.replace('/dashboard');
              } else {
                alert('Failed to add item.');
              }
    };
    // if (item_name && description && purchase_link) {
      
    //   const response = await fetch('/api/item', {
    //     method: 'POST',
    //     body: JSON.stringify({ item_name, description, img_link, purchase_link}),
    //     headers: { 'Content-Type': 'application/json' },
    //   });
  
    //   if (response.ok) {
    //     document.location.replace('/');
    //   } else {
    //     alert('Failed to add item.');
    //   }
    // 

document
  .querySelector('.add')
  .addEventListener('click', addItemToList);


//This is for updating a common list item
const editForUser = () => {
  let username = document.querySelector('.username').textContent;
  fetch(`/api/users/${username}`, {
    method: 'GET'
  })
    //if user is the user that created the entry then show edit button
    .then(response => response.json())
    .then(body => {
      document.querySelectorAll('.common-item').forEach(card => {
        const cardUserId = card.children[0].id;
        if (body.id == cardUserId) {
          const cardItemId = card.children[1].id;
          card.insertAdjacentHTML('beforeEnd', `<button type="button" id="${cardItemId}" class="btn btn-light btn-lg edit-item">Edit</button>`);
        }
      });
      document
        .querySelectorAll('.edit-item').forEach(item => {
          item.addEventListener('click', (event) => {
            document.location.replace('/updateitem/' + event.target.id);
          })
        });
    });
}

editForUser();

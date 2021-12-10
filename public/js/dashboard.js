const addItemToList = async (event) => {

    event.preventDefault();


    const item_id = event.target.getAttribute('data-id');
    const userId = document.querySelector(".active-user-id")
    const userIdValue = userId.getAttribute("value")
    const responseList = await fetch(`/api/list/${userIdValue}`);
    const list = await responseList.json();
    const list_id = list.id


    const responsePut = await fetch(`/api/list/add/${list_id}&${item_id}`, {
        method: 'PUT',        
        headers: { 'Content-Type': 'application/json' },
        });
          
          if (responsePut.ok) {
                document.location.replace('/dashboard');
              } else {
                alert('Failed to add item or you added item.');
              }
    };

document
  .querySelectorAll('.add').forEach(item => {
    item.addEventListener('click', addItemToList)})


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

const deleteItemFromList = async (event) => {

  event.preventDefault();


  const item_id = event.target.getAttribute('data-id');
  const userId = document.querySelector(".active-user-id")
  const userIdValue = userId.getAttribute("value")
  const responseList = await fetch(`/api/list/${userIdValue}`);
  const list = await responseList.json();
  const list_id = list.id



  const responsePut = await fetch(`/api/list/delete/${list_id}&${item_id}`, {
      method: 'PUT',        
      headers: { 'Content-Type': 'application/json' },
      });
        
        if (responsePut.ok) {
              document.location.replace('/dashboard');
            } else {
              alert('Failed remove item from your list');
            }
  };

  document
  .querySelectorAll('.delete').forEach(item => {
    item.addEventListener('click', deleteItemFromList)})

//This is for updating a common list item
const updateItemFormHandler = async (event) => {
    event.preventDefault();
    const item_name = document.querySelector('#item_name').value.trim();
    const description = document.querySelector('#description').value.trim();
    const img_link = document.querySelector('#img_link').value.trim();
    const purchase_link = document.querySelector('#purchase_link').value.trim();
    const user_id = document.querySelector('#user_id').value.trim();
      
    if (item_name && description && purchase_link) {
      
        const response = await fetch('/api/commonlist', {
            method: 'PUT',
            body: JSON.stringify({ item_name, description, img_link, purchase_link, user_id}),
            headers: { 'Content-Type': 'application/json' },
        });
      
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed update item.');
          }
        }
      };
      
      document
        .querySelector('.update-common-item')
        .addEventListener('submit', updateItemFormHandler);

//delete

const deleteItem = async (event) => {
  const id = document.querySelector('#commonlist-item').value.trim();

  if (id) {
    const response = await fetch('/api/commonlist/'+id, {
      method: 'DELETE',
    });
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to delete.');
    }
  }
};

document
  .querySelector('#delete-item')
  .addEventListener('click', deleteItem);
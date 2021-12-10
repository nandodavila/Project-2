//This is for updating a common list item
const updateItemFormHandler = async (event) => {
    event.preventDefault();
    const item_name = document.querySelector('#update-item-name').value.trim();
    const description = document.querySelector('#update-item-description').value.trim();
    const img_link = document.querySelector('#update-image-link').value.trim();
    const purchase_link = document.querySelector('#update-purchase-link').value.trim();
    const user_id = document.querySelector('#user_id').getAttribute('data-id');
    const item_id = event.target.id;
    
    if (item_name || description || purchase_link || img_link ) {
        const response = await fetch(`/api/item/${item_id}`, {
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
  .querySelector('.update')
  addEventListener('submit', updateItemFormHandler);

//delete

const deleteItem = async (event) => {
  const item_id = event.target.id;

  if (item_id) {
    const response = await fetch('/api/item/'+item_id, {
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
  .querySelector('.delete')
  .addEventListener('click', deleteItem);
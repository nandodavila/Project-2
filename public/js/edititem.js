const editItemHandler = async (event) => {
  event.preventDefault();
  const item_name = document.querySelector('.common-item').value.trim();
  const description = document.querySelector('#description').value.trim();
  const img_link = document.querySelector('#img_link').value.trim();
  const purchase_link = document.querySelector('#purchase_link').value.trim();
  const user_id = document.querySelector('#user_id').value.trim();

  if (item_name && description && purchase_link) {

    const response = await fetch('/api/item/:id', {
      method: 'PUT',
      body: JSON.stringify({ item_name, description, img_link, purchase_link, user_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed update item.');
    }
  }
};

// document
//   .querySelector('.edit-item')
//   .addEventListener('submit', editItemFormHandler);
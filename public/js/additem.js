//This is for adding a common list item
const createItemFormHandler = async (event) => {
    event.preventDefault();
    const item_name = document.querySelector('#item_name').value.trim();
    const description = document.querySelector('#description').value.trim();
    const img_link = document.querySelector('#img_link').value.trim();
    const purchase_link = document.querySelector('#purchase_link').value.trim();
    const user_id = document.querySelector('#user_id').value.trim();
  
    if (item_name && description && purchase_link) {
  
      const response = await fetch('/api/commonlist', {
        method: 'POST',
        body: JSON.stringify({ item_name, description, img_link, purchase_link, user_id}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed add comment.');
      }
    }
  };
  
  document
    .querySelector('#new-common-item')
    .addEventListener('submit', createItemFormHandler);

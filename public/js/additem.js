//This is for adding a common list item
const createItemFormHandler = async (event) => {
    event.preventDefault();
    const item_name = document.querySelector('#item-name').value.trim();
    const description = document.querySelector('#item-description').value.trim();
    const img_link = document.querySelector('#image-link').value.trim();
    const purchase_link = document.querySelector('#purchase-link').value.trim();
  
    if (item_name && description && purchase_link) {
      
      const response = await fetch('/api/item', {
        method: 'POST',
        body: JSON.stringify({ item_name, description, img_link, purchase_link}),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to add item.');
      }
    }
};

document
  .querySelector('#new-common-item')
  .addEventListener('submit', createItemFormHandler);

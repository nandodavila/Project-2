const addItemToList = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const id = event.target.getAttribute('data-id');
  
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
  .querySelector('.add')
  .addEventListener('submit', addItemToList);
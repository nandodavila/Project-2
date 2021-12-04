const searchFormHandler = async (event) => {
    event.preventDefault();
  
    const search = document.querySelector('#search-input').value.trim();
   
  
    if (search) {
      // Send a POST request to the API endpoint
      const response = await fetch(`/search/${search}`, {
        method: 'GET',
      });
      console.log(response)
  
      if (response.ok) {
        // Add users url location later, if by ID or username to be determined 
        document.location.replace('/');
      } else {
        alert(`${response.statusText}  No user found with that username, please try again` );
      }
    } else { 
      alert('Error in input field, please check and try again.')
    }
}

document
  .querySelector('.search-form')
  .addEventListener('submit', searchFormHandler);
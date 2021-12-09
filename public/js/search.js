const searchFormHandler = async (event) => {
    event.preventDefault();
  
    const search = document.querySelector('#search-input').value.trim();
   
  
    if (search) {
      // Send a POST request to the API endpoint
      const response = await fetch(`/search/${search}`)
      const userData = await response.json();
      console.log(response)
      console.log(userData);
      const username = userData.user[0].username
      console.log(userData.user[0].username)
     
  
      if (response.ok) {
        
        console.log(userData)
        // Add users url location later, if by ID or username to be determined 
        document.location.replace(`/profile/${username}`);
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
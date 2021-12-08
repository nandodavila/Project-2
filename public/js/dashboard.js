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
                    card.insertAdjacentHTML('beforeEnd', `<button type="button" id="${cardItemId}" class="btn btn-primary btn-lg edit-item">Edit</button>`);
                }
            });
            document
                .querySelector('.edit-item')
                .addEventListener('click', (event) =>{
                    document.location.replace('/updateitem/'+event.target.id);
                });
        });
}

editForUser();
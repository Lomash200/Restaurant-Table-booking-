const profileDiv = document.querySelector('.mainAddItems .container .heading .profile');

//transfer click =======================================>
profileDiv.addEventListener("click", function() {
    document.querySelector(".formDiv #profileInput").click()
});


//DELETE MENU ITEM =========================================>
function deleteMenuItem(itemId) {

    fetch(`/deleteitem/${itemId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            location.reload();
        } else {
            console.error('Error deleting menu item');
        }
    })
    .catch(error => console.error('Error deleting menu item:', error));
}

// ADD IN MENU OF WEEK ==========================================>
function setMenuOfWeek(menuId) {
    fetch(`/setmenuofweek/${menuId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            location.reload()
            response.redirected('back');
        } else {
            console.error('Error updating menu item');
        }
    })
    .catch(error => console.error('Error updating menu item:', error));
}

function removeMenuOfWeek(menuId) {
    fetch(`/removemenuofweek/${menuId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            location.reload()
            response.redirected('back');
        } else {
            console.error('Error updating menu item');
        }
    })
    .catch(error => console.error('Error updating menu item:', error));
}
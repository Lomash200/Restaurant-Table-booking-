function orderItem(itemId) {

    fetch(`/orderitem/${itemId}`, {
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
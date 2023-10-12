const animationData = {
    // Animation data goes here
};

fetch('/api/save_animation', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ animationData }),
})
.then(response => response.json())
.then(data => {
    // Handle the server response (e.g., show a success message to the user)
})
.catch(error => {
    console.error('Error:', error);
});
let deletedItems = [];
function addItem() {

    let n = count;

    if (deletedItems.length !== 0) {
        n = deletedItems.sort(function(a, b) {return a - b;})[0];
    }

    const newItem = document.createElement("li");
    const animationId = `preview${n}`;
    newItem.id = animationId;

    saveAnimation(n);

    // Create the saveSpan element
    const saveSpan = document.createElement("span");
    saveSpan.classList.add("saveSpan");
    saveSpan.textContent = `Save ${n}`;

    // Add a click event listener to the saveSpan
    saveSpan.addEventListener("click", () => applyAnimation(animationId));

    // Create the deleteSpan element
    const deleteSpan = document.createElement("span");
    deleteSpan.classList.add("deleteSpan");
    deleteSpan.textContent = "X";

    // Add a click event listener to the deleteSpan
    deleteSpan.addEventListener("click", (e) => removeItem(e, n));

    // Append the saveSpan and deleteSpan to the newItem
    newItem.appendChild(saveSpan);
    newItem.appendChild(deleteSpan);

    const ul = document.querySelector(".preview-box ul");
    ul.appendChild(newItem);

    if (newItem.previousElementSibling) {
        newItem.previousElementSibling.style.zIndex = "1000";
    }
    newItem.style.marginBottom = "-2em";
    newItem.style.opacity = "0";

    newItem.addEventListener("transitionend", () => {
        if (newItem.previousElementSibling) {
            newItem.previousElementSibling.style.removeProperty("z-index");
        }
    });


    setTimeout(() => {
        newItem.style.removeProperty("margin-bottom");
        newItem.style.removeProperty("opacity");
    }, 50);


    deletedItems.splice(0,1);
    count++;
}

function removeItem(e, n) {
    if (e.target.classList.contains("delete-item")) {
        return;
    }

    count--;

    const animationId = `preview${n}`;

    // Remove the saved animation with the provided ID
    delete savedAnimations[animationId];

    // const n = parseInt(animationId.replace(/\D/g, ''));

    deletedItems.push(n);

    e.target.classList.add("delete-item");

    const elem = e.target.parentElement;
    if (elem.previousElementSibling) {
        elem.previousElementSibling.style.zIndex = "1000";
    }
    elem.style.marginBottom = "-2em";
    elem.style.opacity = "0";

    elem.addEventListener("transitionend", () => {
        elem.remove();
    });

    // BackendPort
    if (isAuthenticated) {
        fetch('/api/remove_animation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify({animationNumber: n}), // Send the number as JSON in the request body
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    console.log(data.message); // Display the message from the server
                } else if (data.error) {
                    alert(data.error); // Display the error message from the server
                } else {
                    alert('Unexpected server response.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while removing the animation.');
            });
    }
}

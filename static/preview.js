
function addItem() {
    const newSave = createSave();
    const n = newSave.number;
    const name = newSave.name;

    const newItem = document.createElement("li");
    const animationId = `preview${n}`;
    newItem.id = animationId;

    saveAnimation(n);

    // Create the saveSpan element
    const saveSpan = document.createElement("span");
    saveSpan.classList.add("saveSpan");
    saveSpan.textContent = name;

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


}

function createSave() {
    // Find the next available block number
    let n = 1;
    while (saves.some((save) => save.number === n)) {
    n++;
    }

    // Create the new block and add it to the array
    const newSave = { number: n, name: `Save ${n}` };
    saves.push(newSave);

    return newSave;
}

function deleteSave(n) {
  const index = saves.findIndex((save) => save.number === n);
  if (index !== -1) {
    saves.splice(index, 1);
    return true;
  }
  return false;
}

function removeItem(e, n) {
    if (e.target.classList.contains("delete-item")) {
        return;
    }

    deleteSave(n);
    const animationId = `preview${n}`;

    // Remove the saved animation with the provided ID
    delete savedAnimations[animationId];

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

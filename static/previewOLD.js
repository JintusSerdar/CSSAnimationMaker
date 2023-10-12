let count = 2;
function addItem() {

    saveAnimation();

    const newItem = document.createElement("li");

    // Create the saveSpan element
    const saveSpan = document.createElement("span");
    saveSpan.classList.add("saveSpan");
    saveSpan.textContent = `Save ${count++}`;

    // Create a closure to capture the current count value
    const i = count - 1;

    // Add a click event listener to the saveSpan
    saveSpan.addEventListener("click", () => handleSaveSpanClick(i));

    // Create the deleteSpan element
    const deleteSpan = document.createElement("span");
    deleteSpan.classList.add("deleteSpan");
    deleteSpan.textContent = "X";

    // Add a click event listener to the deleteSpan
    deleteSpan.addEventListener("click", (e) => handleDeleteSpanClick(e, i));

    // Append the saveSpan and deleteSpan to the newItem
    newItem.appendChild(saveSpan);
    newItem.appendChild(deleteSpan);

    const ul = document.querySelector(".preview-box ul");
    ul.appendChild(newItem);

    newItem.addEventListener("transitionend", () => {
        newItem.previousElementSibling.style.removeProperty("z-index");
    });

    newItem.previousElementSibling.style.zIndex = "1000";
    newItem.style.marginBottom = "-2em";
    newItem.style.opacity = "0";

    setTimeout(() => {
        newItem.style.removeProperty("margin-bottom");
        newItem.style.removeProperty("opacity");
    }, 50);
}

function removeItem(e, n) {
    if (e.target.classList.contains("delete-item")) {
        return;
    }

    savedAnimations.splice(n, 1);

    count--;
    e.target.classList.add("delete-item");

    const elem = e.target.parentElement;
    elem.style.marginBottom = "-2em";
    elem.style.opacity = "0";
    elem.previousElementSibling.style.zIndex = "1000";

    elem.addEventListener("transitionend", () => {
        elem.previousElementSibling.style.removeProperty("z-index");
        elem.remove();

        const saveSpans = document.querySelectorAll(".saveSpan");
        const deleteSpans = document.querySelectorAll(".deleteSpan");

        saveSpans.forEach((saveSpan, i) => {
            saveSpan.textContent = `Save ${i}`;
            const newSaveSpan = removeAllClickEventListeners(saveSpan);
            newSaveSpan.addEventListener("click", () => handleSaveSpanClick(i));
            saveSpan.parentNode.replaceChild(newSaveSpan, saveSpan);
        });

        deleteSpans.forEach((deleteSpan, i) => {
            const newDeleteSpan = removeAllClickEventListeners(deleteSpan);
            newDeleteSpan.addEventListener("click", (e) => handleDeleteSpanClick(e, i));
            deleteSpan.parentNode.replaceChild(newDeleteSpan, deleteSpan);
        });
    });
}

// Function to remove all click event listeners from an element
function removeAllClickEventListeners(element) {
    const clone = element.cloneNode(true);
    element.parentNode.replaceChild(clone, element);
    return clone;
}

function handleSaveSpanClick(i) {
    applyAnimation(i);
}

function handleDeleteSpanClick(e, i) {
    removeItem(e, i);
}

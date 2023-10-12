

// Function to handle changes to the CSS properties
function handleBackgroundColorChange() {
    const backgroundColor = document.getElementById("backgroundColor").value;
    const body = document.querySelector("body");

    // Apply user-selected background color
    body.style.backgroundColor = backgroundColor;
}

// Function to handle changes to span color
function handleSpanColorChange() {
    const spanColor = document.getElementById("spanColor").value;
    document.documentElement.style.setProperty('--spanColor', spanColor);
}

// Function to update CSS variable and display value
function updateSliderValue(inputId, variableName, unit = '') {
    const inputValue = document.getElementById(inputId).value;
    document.documentElement.style.setProperty(`--${variableName}`, inputValue + unit);
    document.getElementById(inputId + 'Value').textContent = inputValue;
}


// Is it better to  have this kind of code or have separate event listeners for each of them?
// Add event listeners to range sliders
document.querySelectorAll('.range').forEach(slider => {
    slider.addEventListener('input', () => {
        switch (slider.id) {
            case 'shadowPixelX':
                updateSliderValue('shadowPixelX', 'shadowPixelX', 'px');
                break;
            case 'shadowPixelY':
                updateSliderValue('shadowPixelY', 'shadowPixelY', 'px');
                break;
            case 'spanWidth':
                updateSliderValue('spanWidth', 'spanWidth', 'px');
                break;
            case 'spanHeight':
                updateSliderValue('spanHeight', 'spanHeight', 'px');
                break;
            case 'spanShade':
                updateSliderValue('spanShade', 'spanShade', 'px');
                break;
            case 'boxWidth':
                updateSliderValue('boxWidth', 'boxWidth', 'px');
                break;
            case 'boxHeight':
                updateSliderValue('boxHeight', 'boxHeight', 'px');
                break;
            case 'borderRadius':
                updateSliderValue('borderRadius', 'borderRadius', '%');
                break;
            case 'transformOriginX':
                updateSliderValue('transformOriginX', 'transformOriginX', 'px');
                break;
            case 'transformOriginY':
                updateSliderValue('transformOriginY', 'transformOriginY', 'px');
                break;
            case 'rotateDegree':
                updateSliderValue('rotateDegree', 'rotateDegree', 'deg');
                break;
            case 'borderPixel':
                updateSliderValue('borderPixel', 'borderPixel', 'px');
                break;
            case 'animationDelay':
                updateSliderValue('animationDelay', 'animationDelay', 's');
                break;
            case 'animationSpeed':
                updateSliderValue('animationSpeed', 'animationSpeed', 's');
                break;
            default:
                break;
        }
    });
});


// Function to update, add, or remove spans
function manageSpans(action) {
    const animationBox = document.querySelector(".animationBox");
    const spans = animationBox.querySelectorAll("span");
    const numberOfSpansInput = document.getElementById("numberOfSpans");
    const numberOfSpans = (parseInt(numberOfSpansInput.value) > 0) ? parseInt(numberOfSpansInput.value) : 0; // Ensure it doesn't go bellow 0

    // Calculate the current number of spans
    const currentNumberOfSpans = spans.length;

    // Determine the new number of spans based on the action
    let newNumberOfSpans = currentNumberOfSpans;

    if (action === "update") {
        newNumberOfSpans = numberOfSpans;
    } else if (action === "add") {
        newNumberOfSpans = currentNumberOfSpans + 1;
    } else if (action === "remove") {
        newNumberOfSpans = Math.max(currentNumberOfSpans - 1, 0); // Ensure it doesn't go bellow 0
    }

    // Remove or add spans as needed
    if (newNumberOfSpans < currentNumberOfSpans) {
        // Remove excess spans
        for (let i = currentNumberOfSpans; i > newNumberOfSpans; i--) {
            animationBox.removeChild(spans[i - 1]);
        }
    } else {
        // Remove all existing spans
        spans.forEach((span) => {
            animationBox.removeChild(span);
        });

        // Create new spans and add them with initial --i values
        for (let i = 1; i <= newNumberOfSpans; i++) {
            const newSpan = document.createElement("span");
            newSpan.style = `--i:${i};`;
            animationBox.appendChild(newSpan);
        }
    }

    // Update the value of the input field
    numberOfSpansInput.value = newNumberOfSpans;
}

// Add event listeners for user interaction
document.getElementById("backgroundColor").addEventListener("input", handleBackgroundColorChange);
document.getElementById("spanColor").addEventListener("input", handleSpanColorChange);
document.getElementById("updateSpansButton").addEventListener("click", () => {manageSpans("update");});
document.getElementById("addSpanButton").addEventListener("click", () => {manageSpans("add");});
document.getElementById("removeSpanButton").addEventListener("click", () => {manageSpans("remove");});

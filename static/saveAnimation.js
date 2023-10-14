
function saveAnimation(animationNumber) {
    const rootElement = getComputedStyle(document.documentElement);
    const animationBox = document.querySelector(".animationBox");
    const spans = animationBox.querySelectorAll("span");
    const spanCountInput = spans.length;
    const spanColorInput = rootElement.getPropertyValue(`--spanColor`);

    const savedAnimation = {
        animationNumber: animationNumber,
        spanColor: spanColorInput,
        spanCount: spanCountInput,
        styles: {} // Store styles as an object
    };

    // Define the list of CSS variables to save
    const animationSettings = [
        'animationDelay',
        'animationSpeed',
        'borderPixel',
        'borderRadius',
        'boxHeight',
        'boxWidth',
        'rotateDegree',
        'shadowPixelX',
        'shadowPixelY',
        'spanHeight',
        'spanShade',
        'spanWidth',
        'transformOriginX',
        'transformOriginY'
    ];


    // Store the CSS variable values in the savedAnimation object
    animationSettings.forEach((setting) => {
        savedAnimation.styles[setting] = rootElement.getPropertyValue(`--${setting}`);
    });

    // Add the saved animation to the object with the provided ID
    savedAnimations[`preview${animationNumber}`] = savedAnimation;


    // BackendPort
    if (isAuthenticated) {
        fetch('/api/save_animation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({savedAnimation}),
        })
            .then(response => response.json())
            .then(data => {
                // Check if the server response indicates success
                if (data.message) {
                    // Show a success message to the user
                    console.log(data.message);
                } else if (data.error) {
                    // Handle the case where the server reports an error
                    alert(data.error);
                } else {
                    // Handle unexpected response format
                    alert('Unexpected server response.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle network errors or other issues here
                alert('An error occurred while saving the animation.');
            });
    }
}


function applyAnimation(animationId) {
    const savedAnimation = savedAnimations[animationId];

    if (savedAnimation) {
        // Apply the saved styles to the root element
        for (let setting in savedAnimation.styles) {
            document.documentElement.style.setProperty(`--${setting}`, savedAnimation.styles[setting]);

            // Update sliders
            document.getElementById(setting).value = savedAnimation.styles[setting].match(/-?\d+(\.\d+)?/g);
            document.getElementById(setting + 'Value').textContent = savedAnimation.styles[setting].match(/-?\d+(\.\d+)?/g);
        }

        // Update span color
        document.documentElement.style.setProperty(`--spanColor`, savedAnimation.spanColor);
        document.getElementById('spanColor').value = savedAnimation.spanColor;

        // Update span count
        document.getElementById('numberOfSpans').value = savedAnimation.spanCount;

        const animationBox = document.querySelector(".animationBox");
        const spans = animationBox.querySelectorAll("span");

        // Remove all existing spans
        spans.forEach((span) => {
            animationBox.removeChild(span);
        });

        // Create new spans and add them with initial --i values
        for (let i = 1; i <= savedAnimation.spanCount; i++) {
            const newSpan = document.createElement("span");
            newSpan.style = `--i:${i};`;
            animationBox.appendChild(newSpan);
        }
    }
}

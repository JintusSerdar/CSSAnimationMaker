const savedAnimations = [];

function saveAnimation() {
    const rootElement = getComputedStyle(document.documentElement);
    const animationBox = document.querySelector(".animationBox");
    const spans = animationBox.querySelectorAll("span");
    const numberOfSpansInput = spans.length;

    const savedAnimation = {
        spanCount: numberOfSpansInput,
        borderRadius: rootElement.getPropertyValue('--borderRadius'),
        transformOriginX: rootElement.getPropertyValue('--transformOriginX'),
        transformOriginY: rootElement.getPropertyValue('--transformOriginY'),
        rotateDegree: rootElement.getPropertyValue('--rotateDegree'),
        borderPixel: rootElement.getPropertyValue('--borderPixel'),
        animationDelay: rootElement.getPropertyValue('--animationDelay'),
        spanColor: rootElement.getPropertyValue('--spanColor'),
        shadowPixelX: rootElement.getPropertyValue('--shadowPixelX'),
        shadowPixelY: rootElement.getPropertyValue('--shadowPixelY'),
        spanShade: rootElement.getPropertyValue('--spanShade'),
        animationSpeed: rootElement.getPropertyValue('--animationSpeed'),
        spanWidth: rootElement.getPropertyValue('--spanWidth'),
        spanHeight: rootElement.getPropertyValue('--spanHeight'),
        boxWidth: rootElement.getPropertyValue('--boxWidth'),
        boxHeight: rootElement.getPropertyValue('--boxHeight')
    };
    savedAnimations.push(savedAnimation);
}

function applyAnimation(n) {

    const savedAnimation = savedAnimations[n];

    for (let setting in savedAnimation) {
        document.documentElement.style.setProperty(`--${setting}`, savedAnimation[setting]);
    }

    const animationBox = document.querySelector(".animationBox");
    const spans = animationBox.querySelectorAll("span");

    // Remove all existing spans
    spans.forEach((span) => {
        animationBox.removeChild(span);
    });

    // Create new spans and add them with initial --i values
    for (let i = 1; i <= savedAnimation["spanCount"]; i++) {
        const newSpan = document.createElement("span");
        newSpan.style = `--i:${i};`;
        animationBox.appendChild(newSpan);
    }
}


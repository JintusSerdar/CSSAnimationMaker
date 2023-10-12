function downloadCSSFile() {
    const backgroundColor = getComputedStyle(document.querySelector("body")).backgroundColor;
    const rootElement = getComputedStyle(document.documentElement);

    // Create a new style element and apply the computed background color
    const css = `
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
 }

.animation-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: ${backgroundColor};
}

:root {
    --animationDelay: ${rootElement.getPropertyValue('--animationDelay')};
    --animationSpeed: ${rootElement.getPropertyValue('--animationSpeed')};
    --borderPixel: ${rootElement.getPropertyValue('--borderPixel')};
    --borderRadius: ${rootElement.getPropertyValue('--borderRadius')};
    --boxHeight: ${rootElement.getPropertyValue('--boxHeight')};
    --boxWidth: ${rootElement.getPropertyValue('--boxWidth')};
    --rotateDegree: ${rootElement.getPropertyValue('--rotateDegree')};
    --shadowPixelX: ${rootElement.getPropertyValue('--shadowPixelX')};
    --shadowPixelY: ${rootElement.getPropertyValue('--shadowPixelY')};
    --spanColor: ${rootElement.getPropertyValue('--spanColor')};
    --spanHeight: ${rootElement.getPropertyValue('--spanHeight')};
    --spanShade: ${rootElement.getPropertyValue('--spanShade')};
    --spanWidth: ${rootElement.getPropertyValue('--spanWidth')};
    --transformOriginX: ${rootElement.getPropertyValue('--transformOriginX')};
    --transformOriginY: ${rootElement.getPropertyValue('--transformOriginY')};

}

.animationBox {
    position: relative;
    width: var(--boxWidth);
    height: var(--boxHeight);
}

.animationBox span {
    position: absolute;
    width: 100%;
    height: 100%;
    transform: rotate(calc(var(--rotateDegree) * var(--i)));
}

.animationBox span::before {
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;
    width: var(--spanWidth);
    height: var(--spanHeight);
    background: transparent;
    box-sizing: border-box;
    border: var(--borderPixel) dotted var(--spanColor);
    border-radius: var(--borderRadius);
    box-shadow: 0 0 var(--spanShade) var(--spanColor),
    calc(-1 * var(--shadowPixelX)) calc(-1 * var(--shadowPixelY)) 0 var(--spanColor),
    calc(-1 * var(--shadowPixelX)) calc(-1 * var(--shadowPixelY)) var(--spanShade) var(--spanColor),
    calc(-1 * var(--shadowPixelX)) var(--shadowPixelY) 0 var(--spanColor),
    calc(-1 * var(--shadowPixelX)) var(--shadowPixelY) var(--spanShade) var(--spanColor),
    var(--shadowPixelX) calc(-1 * var(--shadowPixelY)) 0 var(--spanColor),
    var(--shadowPixelX) calc(-1 * var(--shadowPixelY)) var(--spanShade) var(--spanColor),
    var(--shadowPixelX) var(--shadowPixelY) 0 var(--spanColor),
    var(--shadowPixelX) var(--shadowPixelY) var(--spanShade) var(--spanColor);
    animation: animate var(--animationSpeed) linear infinite;
    animation-delay: calc(-1 * var(--animationDelay) * var(--i));
    transform-origin: var(--transformOriginX) var(--transformOriginY);
    transition: 2s;
}

@keyframes animate {
    0% {
        transform: rotate(0deg);
        filter: hue-rotate(0deg);
    }

    100%{
        transform: rotate(360deg);
        filter: hue-rotate(360deg);
    }
}
            `;

    // Create a Blob with the CSS content
    const blob = new Blob([css], { type: "text/css" });

    // Create a link to download the Blob
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "customAnimation.css";
    link.click();
}

document.getElementById("downloadCSS").addEventListener("click", downloadCSSFile);
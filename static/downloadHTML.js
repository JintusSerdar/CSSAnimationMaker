function downloadHTMLFile() {
    // Create the HTML content dynamically based on the numberOfSpans
    const animationBox = document.querySelector(".animationBox");
    let numberOfSpans = animationBox.querySelectorAll("span").length;;
    const spansHTML = [];
    for (let i = 1; i <= numberOfSpans; i++) {
        spansHTML.push(`<span style="--i: ${i};"></span>`);
    }

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Css Animation</title>
    <link rel="stylesheet" href="customAnimation.css">
</head>
<body>
    <div class="animation-container">
        <div class="animationBox">
            ${spansHTML.join('\n\t\t\t')}
        </div>
    </div>
</body>
</html>
    `;

    // Create a Blob with the HTML content
    const blob = new Blob([html], { type: "text/html" });

    // Create a link to download the Blob
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "customAnimation.html";
    link.click();
}

document.getElementById("downloadHTML").addEventListener("click", downloadHTMLFile);
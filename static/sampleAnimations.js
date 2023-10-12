const sampleAnimation1 = {
    animationNumber: 1,
    spanColor: '#00e9ff',
    spanCount: 180,
    styles: {
        'animationDelay': '0.5s',
        'animationSpeed': '10s',
        'borderPixel': '4px',
        'borderRadius': '50%',
        'boxHeight': '0px',
        'boxWidth': '0px',
        'rotateDegree': '68deg',
        'shadowPixelX': '100px',
        'shadowPixelY': '100px',
        'spanHeight': '11px',
        'spanShade': '20px',
        'spanWidth': '11px',
        'transformOriginX': '98.5px',
        'transformOriginY': '12.5px'
    }
};

const sampleAnimation2 = {
    animationNumber: 2,
    spanColor: "#ff0000",
    spanCount: 120,
    styles: {
        "animationDelay": "9.5s",
        "animationSpeed": "10s",
        "borderPixel": "4px",
        "borderRadius": "50%",
        "boxHeight": "300px",
        "boxWidth": "300px",
        "rotateDegree": "129deg",
        "shadowPixelX": "100px",
        "shadowPixelY": "35px",
        "spanHeight": "20px",
        "spanShade": "20px",
        "spanWidth": "20px",
        "transformOriginX": "161.5px",
        "transformOriginY": "12.5px"
    }
};

const sampleAnimation3 = {
    animationNumber: 3,
    spanColor: "#ff0000",
    spanCount: 120,
    styles: {
        "animationDelay": "9.5s",
        "animationSpeed": "10s",
        "borderPixel": "4px",
        "borderRadius": "50%",
        "boxHeight": "116px",
        "boxWidth": "129px",
        "rotateDegree": "129deg",
        "shadowPixelX": "100px",
        "shadowPixelY": "0px",
        "spanHeight": "100px",
        "spanShade": "0px",
        "spanWidth": "0px",
        "transformOriginX": "0px",
        "transformOriginY": "-42.5px"
    }
};

const sampleAnimation4 = {
    animationNumber: 4,
    spanColor: "#e000b0",
    spanCount: 120,
    styles: {
        "animationDelay": "0.75s",
        "animationSpeed": "10s",
        "borderPixel": "3px",
        "borderRadius": "50%",
        "boxHeight": "107px",
        "boxWidth": "300px",
        "rotateDegree": "129deg",
        "shadowPixelX": "0px",
        "shadowPixelY": "0px",
        "spanHeight": "100px",
        "spanShade": "5px",
        "spanWidth": "100px",
        "transformOriginX": "1px",
        "transformOriginY": "-66px"
    }
};

const sampleAnimation5 = {
    "animationNumber": 5,
    "spanColor": "#4a0df2",
    "spanCount": 360,
    "styles": {
        "animationDelay": "0.75s",
        "animationSpeed": "10s",
        "borderPixel": "3px",
        "borderRadius": "0%",
        "boxHeight": "292px",
        "boxWidth": "0px",
        "rotateDegree": "188deg",
        "shadowPixelX": "0px",
        "shadowPixelY": "0px",
        "spanHeight": "100px",
        "spanShade": "5px",
        "spanWidth": "100px",
        "transformOriginX": "-83.5px",
        "transformOriginY": "300px"
    }
}

if (!isAuthenticated) {
    savedAnimations['preview1'] = sampleAnimation1;
    savedAnimations['preview2'] = sampleAnimation2;
    savedAnimations['preview3'] = sampleAnimation3;
    savedAnimations['preview4'] = sampleAnimation4;
    savedAnimations['preview5'] = sampleAnimation5;

    for (let i = 1; i<=5; i++){
        createSave()
    }
}
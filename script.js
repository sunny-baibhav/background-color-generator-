document.addEventListener("DOMContentLoaded", () => {
    const background = document.getElementById("background");
    const generateColorButton = document.getElementById("generateColor");
    const generateGradientButton = document.getElementById("generateGradient");
    const colorPicker1 = document.getElementById("colorPicker1");
    const colorPicker2 = document.getElementById("colorPicker2");
    const gradientDirection = document.getElementById("gradientDirection");
    const downloadImageButton = document.getElementById("downloadImage");

    generateColorButton.addEventListener("click", () => {
        const randomColor = getRandomColor();
        background.style.background = randomColor;
        colorPicker1.value = rgbToHex(randomColor);
        colorPicker2.style.display = 'none';
        gradientDirection.style.display = 'none';
    });

    generateGradientButton.addEventListener("click", () => {
        const randomColor1 = getRandomColor();
        const randomColor2 = getRandomColor();
        background.style.background = `linear-gradient(to right, ${randomColor1}, ${randomColor2})`;
        colorPicker1.value = rgbToHex(randomColor1);
        colorPicker2.value = rgbToHex(randomColor2);
        colorPicker2.style.display = 'inline';
        gradientDirection.style.display = 'inline';
    });

    colorPicker1.addEventListener("input", updateGradient);
    colorPicker2.addEventListener("input", updateGradient);
    gradientDirection.addEventListener("change", updateGradient);

    downloadImageButton.addEventListener("click", () => {
        html2canvas(background).then(canvas => {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'background.png';
            link.click();
        });
    });

    function getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    function rgbToHex(rgb) {
        const result = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/.exec(rgb);
        return `#${parseInt(result[1]).toString(16).padStart(2, '0')}${parseInt(result[2]).toString(16).padStart(2, '0')}${parseInt(result[3]).toString(16).padStart(2, '0')}`;
    }

    function updateGradient() {
        const color1 = colorPicker1.value;
        const color2 = colorPicker2.value;
        const direction = gradientDirection.value;
        background.style.background = `linear-gradient(${direction}, ${color1}, ${color2})`;
    }
});

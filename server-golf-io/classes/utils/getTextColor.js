const getTextColor = () => {
    return `rgb(${generateNum()}, ${generateNum()}, ${generateNum()})`;
}

const generateNum = () => {
        return Math.floor(Math.random() * 255);
}

module.exports = getTextColor;
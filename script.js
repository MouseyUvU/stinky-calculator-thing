const display = document.getElementById('display');

let inputData = [];

function appendToDisplay(input) {
    display.value += input;
    inputData.push(input);
}

function clearDisplay() {
    display.value = '';
    inputData = [];
}

function calculate() {
    const parsedData = parseData(inputData);
    console.log(">> parsedData", parsedData);
    const result = resolve(parsedData);

    display.value = result.toString();
    inputData = [result.toString()];
}


const characters = /[\+\-\*\/\.]/g;


function parseData(inputData) {
    let parsedData = [];
    let tempData = '';
    for (let index = 0; index < inputData.length; index++) {
        const input = inputData[index];
        const nextInput = inputData[index + 1];
        const inputIsANumber = !input.match(characters)
        
        if (!inputIsANumber) {
            parsedData.push(input);
            continue;
        }
        
        tempData += input;
        
        
        if (nextInput !== undefined) {
            const nextInputIsANumber = !nextInput.match(characters);
            if (nextInputIsANumber) continue;
            if (nextInput === '.') {
                tempData += nextInput;
                index += 1;
                continue;
            }
        }

        const parsedNumber = Number.parseFloat(tempData);
        parsedData.push(parsedNumber);
        tempData = '';
    }
    return parsedData;
}

/**
 * @param {Array<number|string>} parsedData 
 */
function resolve(parsedData) {
    if (parsedData.length === 1) return parsedData;

    const reducedArray = [];
    const m = parsedData.indexOf("*");
    const d = parsedData.indexOf('/');
    const opIndex = m > d ? m : d;

    if (m + d >= -1) {
        for (let i = 0; i < parsedData.length; i++) {
            const x = parsedData[i];
            const y = parsedData[i + 2];
            if (i === opIndex - 1) {
                const result = m > d ? x * y : x / y;
                reducedArray.push(result);
                i += 2;
            } else {
                reducedArray.push(x);
            }
        }
        return resolve(reducedArray);
    } else {
        let acc = 0;
        let temp = 1;
        for (let i = 0; i < parsedData.length; i++) {
            const element = parsedData[i];
            if (element === '-') {
                temp = -1;
            } else if (element === '+') {
                temp = 1;
            } else {
                acc += element * temp;
                temp = 1;
            }
        }
        return acc;
    }
}

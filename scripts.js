const container = document.querySelector("#calculatorContainer");

const resultDiv = document.createElement("div");
resultDiv.id = "resultDiv";
const acceptedKey = {};
function initializeAcceptedKey(){
    for(let i = 0; i < 10; ++i)
        acceptedKey[`${i}`] = 1;
    acceptedKey["/"] = 2
    acceptedKey["*"] = 2
    acceptedKey["+"] = 2
    acceptedKey["-"] = 2
    acceptedKey["="] = 4
    acceptedKey["Backspace"] = 3
    acceptedKey["Enter"] = 4;
    acceptedKey["."] = 5;
}
initializeAcceptedKey();
/*
    1 = number
    2 = operator
    3 = delete
    4 = get result
    5 = float sign;
*/

let currentString = "";
let firstNumber = null;
let secondNumber = null;
let operator = "";
let isFloat = false;
let precision = 2;

function getResult(firstNumber, secondNumber, operator, isFloat){
    if(operator == "+")
        return getNumber(firstNumber + secondNumber, isFloat);
    if(operator == "-")
        return getNumber(firstNumber - secondNumber, isFloat);
    if(operator == "*")
        return getNumber(firstNumber * secondNumber, isFloat);
    if(operator == "/")
        if(secondNumber != 0)
            return getNumber(firstNumber / secondNumber, isFloat);
        else
            return "Divide by 0";
}
function getNumber(str, float){
    if(typeof str != "string")
    {
        if(float)
            return parseFloat(parseFloat(str).toFixed(precision));
        return parseInt(str);
    }
    if(str == "")
    {
        if(float)
            return 0.0;
        return 0;
    }
    if(float)
        return parseFloat(parseFloat(str).toFixed(precision));
    return parseInt(str);
}

let operationPressed = false;
resultDiv.innerText = "0";
function eventHandler(e){
    if(acceptedKey[e.key] == 1 || acceptedKey[e.key] == 5)
    {
        if(acceptedKey[e.key] == 5)
            isFloat = true;
        currentString += e.key;
        resultDiv.innerText = currentString;
    }else if(acceptedKey[e.key] == 3)
    {
        if(currentString != "")
        {
            currentString = currentString.slice(0, currentString.length - 1);
            resultDiv.innerText = currentString;
        }
        else
        {
            firstNumber = null;
            isFloat = false;
            operator = "";
            resultDiv.innerText = "0";
        }
    }else if(acceptedKey[e.key] == 2)
    {
        if(operator == "")
        {
            if(firstNumber == null)
                firstNumber = getNumber(currentString, isFloat);
            operator = e.key;
            resultDiv.innerText = "0";
            currentString = "";
        }
        else
        {
            if(currentString != "")
            {
                secondNumber = getNumber(currentString, isFloat);
                let result = getResult(firstNumber, secondNumber, operator, isFloat);
                if(typeof result == "string")
                {
                    firstNumber = null;
                    operator = "";
                    currentString = "";
                    resultDiv.innerText = "Divide by 0";
                }
                else
                {
                    firstNumber = result;
                    operator = e.key;
                    currentString = "";
                    resultDiv.innerText = firstNumber;
                }
            }
            else
                operator = e.key;
        }
    }else if(acceptedKey[e.key] == 4)
    {
        if(operator != "")
        {
            secondNumber = getNumber(currentString, isFloat);
            let result = getResult(firstNumber, secondNumber, operator, isFloat);
            if(typeof result == "string")
            {
                firstNumber = null;
                operator = "";
                currentString = "";
                resultDiv.innerText = "Divide by 0";
            }
            else
            {  
                firstNumber = result;
                operator = "";
                resultDiv.innerText = firstNumber;
                currentString = "";
            }
        }
        else
        {
            firstNumber = getNumber(currentString, isFloat);
            resultDiv.innerText = firstNumber;
            currentString = "";

        }
    }
}
window.addEventListener("keydown", eventHandler);

container.appendChild(resultDiv);
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

function getResult(firstNumber, secondNumber, operator){
    if(operator == "+")
        return firstNumber + secondNumber;
    if(operator == "-")
        return firstNumber - secondNumber;
    if(operator == "*")
        return firstNumber * secondNumber;
    if(operator == "/")
        if(secondNumber != 0)
            return firstNumber / secondNumber;
        else
            return "Divide by 0";
}
function getNumber(str, float){
    if(str == "")
    {
        if(float)
            return 0.0;
        return 0;
    }
    if(float)
        return parseFloat(str);
    return parseInt(str);
}

let operationPressed = false;
resultDiv.innerText = "0";
function eventHandler(e){
    if(acceptedKey[e.key] == 1)
    {
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
            operator = "";
            resultDiv.innerText = "0";
        }
    }else if(acceptedKey[e.key] == 2)
    {
        if(operator == "")
        {
            if(firstNumber == null)
                firstNumber = getNumber(currentString);
            operator = e.key;
            resultDiv.innerText = "0";
            currentString = "";
        }
        else
        {
            if(currentString != "")
            {
                secondNumber = getNumber(currentString);
                firstNumber = getResult(firstNumber, secondNumber, operator);
                operator = e.key;
                currentString = "";
                resultDiv.innerText = firstNumber;
            }
            else
                operator = e.key;
        }
    }else if(acceptedKey[e.key] == 4)
    {
        if(operator != "")
        {
            secondNumber = getNumber(currentString);
            firstNumber = getResult(firstNumber, secondNumber, operator);
            operator = "";
            resultDiv.innerText = firstNumber;
            currentString = "";
        }
        else
        {
            firstNumber = getNumber(currentString);
            resultDiv.innerText = firstNumber;
            currentString = "";

        }
    }
}
window.addEventListener("keydown", eventHandler);

container.appendChild(resultDiv);
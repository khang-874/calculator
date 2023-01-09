const container = document.querySelector("#calculatorContainer");

const resultDiv = document.createElement("div");
resultDiv.id = "resultDiv";
const acceptedKey = {};
function initializeAcceptedKey(){
    for(let i = 0; i < 10; ++i)
        acceptedKey[`${i}`] = 1;
    acceptedKey["/"] = 2;
    acceptedKey["*"] = 2;
    acceptedKey["+"] = 2;
    acceptedKey["-"] = 2;
    acceptedKey["="] = 4;
    acceptedKey["Backspace"] = 3;
    acceptedKey["Enter"] = 4;
    acceptedKey["."] = 5;
    acceptedKey["Delete"] = 3;
    acceptedKey["Clear"] = 3;
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
            return getNumber(firstNumber / secondNumber, true);
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
resultDiv.classList.add("result")
let outerResultDiv = document.createElement("div");
outerResultDiv.id = "outerResultDiv";

let currentPhraseDiv = document.createElement("div");
let currentPhrase = "";
currentPhraseDiv.id = "currentPhraseDiv";
currentPhraseDiv.classList.add("result");

outerResultDiv.appendChild(currentPhraseDiv);
outerResultDiv.appendChild(resultDiv);
let resultHit = false;
function eventHandler(key){
    if(acceptedKey[key] && resultHit)
        {
            resultHit = false;
            currentPhrase = firstNumber;
        }
    if(acceptedKey[key] == 1 || acceptedKey[key] == 5)
    {
        if(currentString != "" || key != "0"){    
            if(acceptedKey[key] == 5)
                isFloat = true;
            currentString += key;
            resultDiv.innerText = currentString;
        }
    }else if(acceptedKey[key] == 3)
    {
        if(currentString == "" || key == "Clear")
        {
            firstNumber = null;
            isFloat = false;
            operator = "";  
            resultDiv.innerText = "0";
            currentString = "";
            currentPhrase = "";
        }else 
        {
            currentString = currentString.slice(0, currentString.length - 1);
            resultDiv.innerText = currentString;
        }
    }else if(acceptedKey[key] == 2)
    {
        if(operator == "")
        {
            if(firstNumber == null){
                firstNumber = getNumber(currentString, isFloat);
                currentPhrase += firstNumber;
            }
            operator = key;
            resultDiv.innerText = "0";
            currentString = "";
            currentPhrase += key;
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
                    currentPhrase = "";
                }
                else
                {
                    firstNumber = result;
                    operator = key;
                    currentString = "";
                    resultDiv.innerText = firstNumber;
                    currentPhrase = result + operator;
                }
            }
            else{
                operator = key;
                currentPhrase[currentPhrase.length - 1] = operator; 
            }
        }
    }else if(acceptedKey[key] == 4)
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
                currentPhrase = "";
            }
            else
            {  
                firstNumber = result;
                operator = "";
                resultDiv.innerText = firstNumber;
                currentString = "";
                currentPhrase += secondNumber;
                currentPhrase += "=";
                currentPhrase += firstNumber;
                resultHit = true;
            }
        }
    }
    currentPhraseDiv.innerText = currentPhrase;
}
window.addEventListener("keydown", e => {
    eventHandler(e.key);
});

let numPad = document.createElement("div");
numPad.id = "numPad";
{
    let currentNumber = 0;
    for(let i = 1; i <= 3; ++i)
        for(let j = 1;j <= 3; ++j){
            let pad = document.createElement("div");
            pad.classList.add("button");
            pad.innerText = ++currentNumber;
            pad.style = `grid-area: ${i+1} / ${j} / ${i+2} / ${j + 1}`;
            console.log(`${i} / ${j} / ${i +1} / ${j + 1}`);
            pad.addEventListener("mousedown", e => {
                eventHandler(e.target.innerText);
            })
            numPad.appendChild(pad);
        }
    
    let remain = [];
    {
    remain = [{
        text: "0",
        row: 5,
        col: 1
    },{
        text: ".",
        row: 5,
        col: 2
    },{
        text: "+",
        row: 5,
        col: 3
    }, {
        text: "=",
        row: 5,
        col: 4
    }, {
        text: "-",
        row: 4,
        col: 4
    }, {
        text: "*",
        row: 3,
        col: 4
    }, {
        text: "/",
        row: 2,
        col: 4
    }, {
        text: "Delete",
        row: 1,
        col: 1
    }, {
        text: "Clear",
        row: 1,
        col: 3
    }];
    }
    for(let i = 0; i < remain.length; ++i){
        let pad = document.createElement("div");
        pad.innerText = remain[i].text;
        pad.classList.add("button");
        pad.style.gridArea = `${remain[i].row} / ${remain[i].col} / ${remain[i].row+1} / ${remain[i].col + 1}`;
        if(remain[i].text == "Delete" || remain[i].text == "Clear"){
            pad.style.gridArea = `${remain[i].row} / ${remain[i].col} / ${remain[i].row+1} / ${remain[i].col + 2}`;
        }
        pad.addEventListener("mousedown", e =>{
            eventHandler(e.target.innerText);
        });
        numPad.appendChild(pad);
    }

}
container.appendChild(outerResultDiv);
container.appendChild(numPad);
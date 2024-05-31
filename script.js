let buttonInput = document.querySelectorAll('.buttons1 button');
let buttonOutput = document.querySelectorAll('.buttons2 button');
let input = document.querySelector('#input');
let output = document.querySelector('#output');
let p_input = document.querySelector('.p_input');
let p_output = document.querySelector('.p_output');
let alert = document.querySelector('.alert');

function checkConnection() {
    if (!navigator.onLine) {
        alert.innerHTML = 'No internet connection!';
        input.addEventListener('input', ()=>{
            let a = document.querySelector('.buttons1 .active').innerHTML;
            let b = document.querySelector('.buttons2 .active').innerHTML;
            if( a === b ){
                value1 = input.value;
                output.value = value1;
            }else{
                input.value = '';
                output.value = '';
            }
        })
        output.addEventListener('input', ()=>{
            let a = document.querySelector('.buttons1 .active').innerHTML;
            let b = document.querySelector('.buttons2 .active').innerHTML;
            if( a === b ){
                value1 = output.value;
                input.value = value1;
            }else{
                input.value = '';
                output.value = '';
            }
        })
    }else {
        alert.innerHTML=""
    }
}

function fixedValue(num){
    return num.toFixed(5);
}

fetch(`https://api.fastforex.io/fetch-all?from=RUB&api_key=76a644a2d9-a525786889-scc38i`)
        .then(res => res.json())
        .then(data => {
            p_input.innerHTML = `1 RUB = ${data.results.USD} USD`;
            input.value=1
            output.value = fixedValue(input.value * data.results.USD);
        });
    fetch(`https://api.fastforex.io/fetch-all?from=USD&api_key=76a644a2d9-a525786889-scc38i`)
        .then(res => res.json())
        .then(data =>{
            p_output.innerHTML = `1 USD = ${data.results.RUB} RUB`;
        })


function inputValue(){
    let m = document.querySelector('.buttons1 .active').innerHTML;
    let n = document.querySelector('.buttons2 .active').innerHTML;
    fetch(`https://api.fastforex.io/fetch-all?from=${m}&api_key=76a644a2d9-a525786889-scc38i`)
        .then(res => res.json())
        .then(data => {
            p_input.innerHTML = `1 ${m} = ${data.results[n]} ${n}`;
            output.value = fixedValue(input.value * data.results[n]);
        });
    fetch(`https://api.fastforex.io/fetch-all?from=${n}&api_key=76a644a2d9-a525786889-scc38i`)
        .then(res => res.json())
        .then(data =>{
            p_output.innerHTML = `1 ${n} = ${data.results[m]} ${m}`;
        })
}

function outputValue(){
    let m = document.querySelector('.buttons1 .active').innerHTML;
    let n = document.querySelector('.buttons2 .active').innerHTML;
    fetch(`https://api.fastforex.io/fetch-all?from=${n}&api_key=76a644a2d9-a525786889-scc38i`)
        .then(res => res.json())
        .then(data => {
            p_output.innerHTML = `1 ${n} = ${data.results[m]} ${m}`;
            input.value = fixedValue(output.value * data.results[m]);
        });
    fetch(`https://api.fastforex.io/fetch-all?from=${m}&api_key=76a644a2d9-a525786889-scc38i`)
        .then(res => res.json())
        .then(data =>{
            p_input.innerHTML = `1 ${m} = ${data.results[n]} ${n}`;
        })
}

fetch(`https://api.fastforex.io/fetch-all?from=All&api_key=76a644a2d9-a525786889-scc38i`)
    .then(res => res.json())
    .then(data => {
        p_input.innerHTML = `1 RUB = ${data.results.USD} USD`;
        input.value
        p_output.innerHTML = `1 USD = ${data.results.RUB} RUB`;
    });

buttonInput.forEach(a => {
    a.addEventListener('click', () => {
        buttonInput.forEach(b => {
            b.classList.remove('active');
        });
        a.classList.add('active');       
        inputValue();
        checkConnection();
    });
    input.addEventListener('input', ()=>{

        inputValue();
        checkConnection();
    });  
});

buttonOutput.forEach(a => {
    a.addEventListener('click', () => {
        buttonOutput.forEach(b => {
            b.classList.remove('active');
        });
        a.classList.add('active');
        outputValue();
        checkConnection();
    });
    output.addEventListener('input', ()=>{

        outputValue();
        checkConnection();
    })
});

input.addEventListener("input", function() { 
    let inputValue = this.value; 
    if (!/^\d*\.?\d*$/.test(inputValue)) { 
        this.value = inputValue.slice(0, -1);  
        return; 
    }   
}); 

output.addEventListener("input", function() { 
    let outputValue = this.value; 
    if (!/^\d*\.?\d*$/.test(outputValue)) { 
        this.value = outputValue.slice(0, -1);  
        return;
    } 
});
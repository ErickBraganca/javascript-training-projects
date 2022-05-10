/* 
Objetivo:
Esta aplicação te a função de calcular a velocidade (RPM) ou os diâmetros (MM)
das polias interligadas de acordo com as variáveis que desejar.

Variáveis:
1 - Diametro da polia do lado motor.
2 - Velocidade da polia no lado motor.
3 - Diametro da polia a ser movida.
4 - Velocidade da polia a ser movida.
*/

//Variável dos botões
const btnCalc = document.getElementById("calc")
const btnClean = document.getElementById("clean")

//Variáveis da polia motora
const dMotora = document.getElementById("D1") //Diametro polia motora.
const vMotora = document.getElementById("n1") //Velocidade polia motora.

//Variáveis da polia movida
const dMovida = document.getElementById("D2") //Diametro polia movida.
const vMovida = document.getElementById("n2") //Velocidade polia movida.

//Criação das funções para cada condição.
function calcDiameterMotora() {
    dMotora.value = ((vMovida.value * dMovida.value) / vMotora.value).toFixed(0) //Function 1
}
function calcVelocityMotora() {
    vMotora.value = ((vMovida.value * dMovida.value) / dMotora.value).toFixed(0) //Function 2
}
function calcDiameterMovida() {
    dMovida.value = ((vMotora.value * dMotora.value) / vMovida.value).toFixed(0) //Function 3
}
function calcVelocityMovida() {
    vMovida.value = ((vMotora.value * dMotora.value) / dMovida.value).toFixed(0) //Function 4
}

//Captura do evento de click co botão calcular
btnCalc.addEventListener("click", function () {
    if (dMotora.value === "" && vMotora.value != "" && dMovida.value != "" && vMovida.value != "") {
        calcDiameterMotora() //Function 1
    }
    else if (vMotora.value === "" && dMotora.value != "" && dMovida.value != "" && vMovida.value != "") {
        calcVelocityMotora() //Function 2
    }
    else if (dMovida.value === "" && dMotora.value != "" && vMotora.value != "" && vMovida.value != "") {
        calcDiameterMovida() //Function 3
    }
    else if (vMovida.value === "" && dMotora.value != "" && vMotora.value != "" && dMovida.value != "") {
        calcVelocityMovida() //Function 4
    }
    else {
        alert("Apenas três campos preenchidos é válido")
    };
})

//Captura do evento de click co botão lipar
btnClean.addEventListener("click", function () {
    dMotora.value = ""
    vMotora.value = ""
    dMovida.value = ""
    vMovida.value = ""
})

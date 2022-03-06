//Função que atualiza a data quando a página é carregada.
window.onload = dataUp
function dataUp() {
    var today = new Date()
    document.getElementById("current-date").innerHTML = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear()
}
//Instanciando as variáveis que recebem os dados do imputs e criando um listner para o evento de click
var btn_calc = document.getElementById("button-calc").addEventListener("click", function calc() {
    var txt_weight = Number(document.getElementById("weight").value)
    var imageContainer = document.getElementById("image-result")

    // Convertendo o input field que está em centímetros para metros.
    var txt_hight = Number((document.getElementById("hight").value) / 100)

    //Performando o calculo do IMC.
    var imc = (txt_weight / (txt_hight * txt_hight)).toFixed(2)

    function updateData() {
        //Populando o <span/> com as informações coletadas nos inputs.
        document.getElementById("prof-imc").innerHTML = "  " + imc
        document.getElementById("prof-weight").innerHTML = "  " + txt_weight + " Kg"
        document.getElementById("prof-hight").innerHTML = "  " + txt_hight + " M"
    }
    //Validação dos campos contra a falta de preenchimento.
    if (txt_weight == "" && txt_weight == 0 || txt_hight == 0 && txt_hight == "" || txt_hight < 1) {
        alert("Digite valores válidos nos campos")
    }
    //Condição 1, IMC de muito abaixo do peso.
    else if (imc < 17) {
        updateData()
        imageContainer.innerHTML = '<img src="src/img/img_imc1.png" alt="Muito Abaixo do Peso">'
    }
    //Condição 2, IMC de abaixo do peso.
    else if (imc >= 17 && imc <= 18.49) {
        updateData()
        imageContainer.innerHTML = '<img src="src/img/img_imc2.png" alt="Abaixo do Peso">'
    }
    //Condição 3, IMC de peso normal.
    else if (imc >= 18.5 && imc <= 24.99) {
        updateData()
        imageContainer.innerHTML = '<img src="src/img/img_imc3.png" alt="Peso Normal">'
    }
    //Condição 4, IMC de acima do peso.
    else if (imc >= 25 && imc <= 29.99) {
        updateData()
        imageContainer.innerHTML = '<img src="src/img/img_imc4.png" alt="Acima do Peso">'
    }
    //Condição 5, IMC de obesidade nível I.
    else if (imc >= 30 && imc <= 34.99) {
        updateData()
        imageContainer.innerHTML = '<img src="src/img/img_imc5.png" alt="Obesidade I">'
    }
    //Condição 6, IMC de obesidade nível II.
    else if (imc >= 35 && imc <= 39.99) {
        updateData()
        imageContainer.innerHTML = '<img src="src/img/img_imc6.png" alt="Obesidade II">'
    }
    //Condição 7, IMC de obesidade nível III.
    else if (imc > 40) {
        imageContainer.innerHTML = '<img src="src/img/img_imc7.png" alt="Obesidade III">'
    }
    else {
        alert("Digite Valores Válidos")
    }
})



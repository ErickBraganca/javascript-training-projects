import { View } from "./view.js"
import { App } from "./app.js"

//Seção, input e forms
const dropSection = document.getElementById("drop")
const formSection = document.getElementById("form")
const textInput = document.getElementById("date")
const textNote = document.getElementById("note")

//Botões de função da aplicação
//const btnState = document.querySelector('input[name="app"]:checked').value
const btnShow = document.getElementById("show")

//Botões de Ação
const btnAdd = document.getElementById("add")
const btnOff = document.getElementById("off")
const btnClean = document.getElementById("clean")

//Função de inicialização da aplicação
function init() {
  App.run()
}

//Observador da seleção de funções
formSection.addEventListener("change", function (event) {
  const value = formSection.app.value
  if (value === "clock") {
    App.updateState(value)
    App.run()
    View.updateView(value)
  } else {
    App.updateState(value)
    View.clearClock()
    View.updateView(value)
  }
})

//Adiciona o contador
btnAdd.addEventListener("click", function () {
  if (textInput.value === "") {
    alert("Preencha o tempo")
  }
  else {
    init()
  }
});

//Pausa a contagem de tempo
btnOff.addEventListener("click", function () {
  App.stop()
});

//Encerra a contagem de tempo
btnClean.addEventListener("click", function () {
  View.clearClock()
});

//Aciona a drop section
btnShow.addEventListener("change", function () {
  if (formSection.app.value == "clock") {
    alert("Selecione a função de timer ou alarm")
  } else if (btnShow.checked == true) {
    View.hideSection()
  } else {
    View.showSection()
  }
});

//Solicita Permissão para Push Notification
window.onload = function alerta() {
  Notification.requestPermission().then(function (p) {
    if (p === 'granted') {
      console.log('Notificação Permitida')
    } else {
      console.log('Notificação Bloqueada.');
    }
  }).catch(function (err) {
    console.error(err);
  });
}

init()



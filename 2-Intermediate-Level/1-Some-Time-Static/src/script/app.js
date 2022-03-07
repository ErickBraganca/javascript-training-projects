import { View } from "./view.js"

const stateDummy = ['clock']
const App = {
	//Instancia em um array as funções de operação da aplicação.
	definition(selector) {
		const Operation = {
			clock() {
				App.clock()
			},
			timer() {
				App.timer()
			},
			alarm() {
				App.alarm()
			},
			default() {
				alert("Nenhuma Opção Escolhida");
			},
		}
		return Operation[selector] || Operation["default"]
	},
	//Atualiza o estado da Aplicação
	updateState(value) {
		stateDummy.unshift(value)
	},
	//Inicia o as repetições conforme conforme retorno da função de seleção.
	run() {
        App.counter = setInterval(function(){
			const aplication = App.definition(stateDummy[0])
			aplication()
		}, 1000)
    },
	//Função que paraliza o setInterval
	stop(){
		clearInterval(App.counter)
	},
	//Converte os milisegundos obtidos em frações
	converter(loopTime) {
		const second = 1000
		const minute = second * 60
		const hour = minute * 60
		const day = hour * 24

		const textDay = Math.floor(loopTime / day)
		const textHour = Math.floor((loopTime % day) / hour)
		const textMinute = Math.floor((loopTime % hour) / minute)
		const textSeconde = Math.floor((loopTime % minute) / second)

		View.updateDisplay(textSeconde, textMinute, textHour, textDay)
	},
	//Lógica de Relógio
	clock(){
		const currentDate = new Date()
		const textSeconde = currentDate.getSeconds()
		const textMinute = currentDate.getMinutes()
		const textHour =  currentDate.getHours()
		const textDay = currentDate.getDate()

		View.updateDisplay(textSeconde, textMinute, textHour, textDay)
	},
	//Lógica de timer
	timeStart: 0,
	timer() {
		const baseTime = document.getElementById("date").valueAsNumber
		let loopTime = (App.timeStart++) * 1000

		if (loopTime > baseTime) {
			App.stop()
			View.clearClock()
			View.notifyMe()
		}
		else {App.converter(loopTime)
		}
	},
	//Lógica do Alarme
	alarm() {
		const dataValue = document.getElementById("date").value
		const updateData = new Date(dataValue)
		const currentDate = new Date().getTime()
		const diference = updateData - currentDate

		if (diference < 0) {
			App.stop()
			View.clearClock()
			View.notifyMe()

		}
		else {App.converter(diference)}
	},
}

export { App }
import { App } from "./app.js";

const View = {
  //Campos do Relógio
  textDays: document.getElementById("days"),
  textHours: document.getElementById("hours"),
  textMinutes: document.getElementById("minutes"),
  textSeconds: document.getElementById("seconds"),
  textTime: document.getElementById("date"),
  textNote: document.getElementById("note"),
  section: document.getElementById("drop"),

  updateView(value){
    const application = (View.definition(value));
    application()
  },
  			
  //Objetos literais para encadeamento das funções
  definition(selector) {
    const Operation = {
      clock() {
        console.log("Clock View Ativado");
        View.hideSection()
      },
      timer() {      
        View.textTime.setAttribute('type', 'time',)
        View.textTime.setAttribute('step', '2',)
        View.showSection()
        console.log("Timer View Ativado");
      },
      alarm() {
        View.textTime.setAttribute('type', 'datetime-local')
        View.textTime.setAttribute('step', '',)
        View.section.style.display="block"
        console.log("Alarme View Ativado");
        View.showSection()
      },
      default() {
        alert("Nenhuma View Atualizada");
      },
    }
    return Operation[selector] || Operation["default"]
  },

  //Atualiza o display
  updateDisplay(timeSeconde, timeMinute, timeHour, timeDay) {
    View.textSeconds.innerText = timeSeconde < 10 ? "0" + timeSeconde : timeSeconde
    View.textMinutes.innerText = timeMinute < 10 ? "0" + timeMinute : timeMinute
    View.textHours.innerText = timeHour < 10 ? "0" + timeHour : timeHour
    View.textDays.innerText = timeDay < 10 ? "0" + timeDay : timeDay
  },

//Limpa todos os campos.
  clearClock() {
    App.stop()
    App.timeStart = 0
    View.textSeconds.innerText = "00"
    View.textMinutes.innerText = "00"
    View.textHours.innerText = "00"
    View.textDays.innerText = "00"
  },

  showSection(){
    View.section.style.display="block"
  },

  hideSection(){
    View.section.style.display="none"
  },

  notifyMe() {
    const timerSong = new Audio("./src/sound/alarm.mp3")
    timerSong.play()

    Notification.requestPermission().then(function (p) {
      var notify = new Notification('Seu tempo acabou!', {
        body: `${View.textNote.value}`,
        icon: './src/images/alert.png',
      });

    }).catch(function (err) {
      console.error(err);
    });
  }
}
export { View }
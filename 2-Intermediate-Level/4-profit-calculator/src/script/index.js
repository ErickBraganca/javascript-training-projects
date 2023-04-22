import 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js';

const today = new Date();
const date = new Intl.DateTimeFormat('pt-BR').format(today)

let currentRates = null
let currentInvestiments = []

const btnCalc = document.querySelector('#add')
const btnDelete = document.querySelector('#delete')
const btnClean = document.querySelector('#clean')

const ctx = document.getElementById('graph')

const inputAmount = document.querySelector('#amount')
const selectIndex = document.querySelector('#index')
const selectInterval = document.querySelector('#interval')
const selectTime = document.querySelector('#time')
const selectPaper = document.querySelector('#bond')
const inputRate = document.querySelector('#rate')
const graphContext = document.querySelector('#graph')

const App = {
    //Enterpoint of profit aplication
    start() {
        currentRates = this.geDataFromStorage('taxes')
        currentInvestiments = this.geDataFromStorage('investiments')

        //this.setGraph()
    },
    //Constructor of investiment profile
    async buildInvestiment() {
        const amount = Number(inputAmount.value)
        const index = selectIndex.value
        const interval = selectInterval.value
        const time = Number(selectTime.value)
        const bond = selectPaper.value
        const rate = Number(inputRate.value) / 100

        const checkData = currentRates.Date === date

        if (!checkData) {
            await this.getDataFromAPI()
            currentRates = this.geDataFromStorage('taxes')
        }
        const taxe = (currentRates[index]) / 100
        const investiment = this.getInvestProfile(amount, index, taxe, interval, time, bond, rate)

        const profit = investiment.netProfit()

        this.setGraph(profit)
        //currentInvestiments.push(investiment)
        //this.setDataToStorage('investiments', currentInvestiments)
    },
    //Getter of taxe date from API
    async getDataFromAPI() {
        const requestUrl = 'https://brasilapi.com.br/api/taxas/v1'
        const requestOptions = {
            method: 'get',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'Application/json'
            },
        }
        const requestController = new AbortController()
        const requestTimeout = setTimeout(() => { requestController.abort() }, 2000)

        try {
            try {
                const response = await fetch(requestUrl, {
                    signal: requestController.signal,
                    ...requestOptions
                })
                const data = await response.json()
                const taxes = {
                    Selic: data[0].valor,
                    CDI: data[1].valor,
                    IPCA: data[2].valor,
                    Date: date
                }
                this.setDataToStorage('taxes', taxes)
                console.log('Received Data From API')
            } catch (error) {
                console.log(error)
            }
        } finally {
            return clearTimeout(requestTimeout)
        }
    },
    //Constructor of investiment profile
    getInvestProfile(amount, index, taxe, interval, time, bond, rate) {
        return {
            amount: amount,
            index: index,
            taxe: taxe,
            interval: interval,
            time: time,
            bond: bond,
            rate: rate,
            netProfit: function () {
                const liquidity = []
                const controller = {
                    month: () => {
                        let index = -1
                        while (index < this.time) {
                            index++

                            let setMonth = new Date(today.getFullYear(), today.getMonth() + index)
                            let nextMonth = new Intl.DateTimeFormat('pt-br', { month: 'long' }).format(setMonth).toUpperCase()


                            if (index === 0) {
                                liquidity.push({ key: nextMonth, profit: this.amount })
                            } else {
                                let id = index - 1
                                let { month, profit } = liquidity[id]
                                let nextProfit = Number(profit * (1 + (this.taxe / 12)))
                                liquidity.push({ key: nextMonth, profit: nextProfit })
                            }
                        }
                        return liquidity
                    },
                    year: () => {
                        //Get each year 
                        let initValue = [this.date, this.amount]
                        liquidity.push(initValue)

                        for (let index = 0; index < this.time; index++) {
                            let setYear = new Date(today.getFullYear() + index, today.getMonth())
                            let nextYear = new Intl.DateTimeFormat('en-us', { year: 'numeric' }).format(setYear)

                            let [lastYear, lastProfit] = liquidity[index + 1]
                            let nextProfit = Math.round(lastProfit * (1 + (this.taxe)))

                            liquidity.push([nextYear, nextProfit])
                        }
                        return liquidity
                    }
                }
                const instance = controller[this.interval]
                return instance()
            }
        }
    },
    //Getter of data from storage
    geDataFromStorage(key) {
        const grossData = localStorage.getItem(key)
        const currentData = JSON.parse(grossData)

        // Check if has any data stored
        if (!currentData) {
            return []
        } else {
            return currentData
        }
    },
    //Setter of d   ata to storage
    setDataToStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data))
    },
    setGraph(info) {
        const series = info.map(element => element.profit)
        const labels = info.map(element => element.key)



        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Rendimento Liquido',
                    data: series,
                    borderWidth: 1
                }]
            },
        });
    }
}

btnCalc.addEventListener('click', function () {
    App.buildInvestiment()
})

export { App };


const btnCalc = document.querySelector('#add')
const btnDelete = document.querySelector('#delete')
const btnClean = document.querySelector('#clean')

const inputAmount = document.querySelector('#amount')
const selectIndex = document.querySelector('#index')
const selectInterval = document.querySelector('#interval')
const selectTime = document.querySelector('#time')
const selectPaper = document.querySelector('#bond')
const inputRate = document.querySelector('#rate')

class Investiments {
    constructor(amount, index, interval, time, bond, rate, taxe) {
        this.amount = amount
        this.index = index
        this.taxe = taxe
        this.interval = interval
        this.time = time
        this.bond = bond
        this.rate = rate
        this.profit = [this.getNetProfit(), this.getGrossProft()]
    }
    getNetProfit() {
        return [1234, 1235, 1236]
    }
    getGrossProft() {
        return [1200, 1220, 1100]
    }
}


async function getIndex() {
    const requestUrl = 'https://brasilapi.com.br/api/taxas/v1'
    const requestOptions = {
        method: 'get',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        },
    }
    const requestController = new AbortController()
    const requestTimeout = setTimeout(() => { requestController.abort() }, 2000)

    return fetch(requestUrl, {
        signal: requestController.signal,
        ...requestOptions
    })
        .then((response) => response.json())
        .then((data) => {
            const taxes = {
                Selic: data[0].valor,
                CDI: data[1].valor,
                IPCA: data[2].valor
            }
            return taxes
        })
        .catch((error) => console.log(error))
        .finally((final) => clearTimeout(requestTimeout))
}
async function init() {
    const amount = inputAmount.value
    const index = selectIndex.value
    const interval = selectInterval.value
    const time = selectTime.value
    const bond = selectPaper.value
    const rate = inputRate.value

    const data = await getIndex()
    const taxe = data[index]
    const investiment = new Investiments(amount, index, interval, time, bond, rate, taxe)

    console.log(investiment)
}

btnCalc.addEventListener('click', function () {
    init()
})


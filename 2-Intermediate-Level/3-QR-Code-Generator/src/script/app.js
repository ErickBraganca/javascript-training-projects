/*-------------------------------------------
[cht=qr] - Specifies a QR code
[chs=<width>x<height>] - Image Size
[chl=<data>] - Data
[choe=<output_encoding>] - Output
-------------------------------------------*/
const selectType = document.getElementById('type')
const selectSize = document.getElementById('size')
const textData = document.getElementById('data')

const btnAdd = document.getElementById('add')
const btnDelet = document.getElementById('delet')
const btnClean = document.getElementById('clean')

let appArea = document.getElementById('app')

const encoding = "UTF-8"
const maps = `https://www.google.com/maps/place/`

async function takeQRCode(size, type, data) {
    
    const sizeString = `${size}x${size}`
    const urlAPI = `https://chart.googleapis.com/chart?chs=${sizeString}&cht=qr&chl=${data}&choe=${encoding}`
    const sizeAdjust = Number(size) > 300 ? true : false

    try {
        const response = await fetch(urlAPI, { method: "GET" })
        const url = response.url
        renderQRCode(url, sizeAdjust)

    } catch (error) {
        console.log(error)
    }
}

let index = 1
async function renderQRCode(url, adjust) {
    index = index + 1

    const div = document.createElement('div')
    div.classList.add('qrcode-img')
    div.setAttribute('id', `qrcdiv${index}`)
    div.setAttribute('download', `qrcimg${index}.png`)
    div.setAttribute('href', `${url}`)


    const img = document.createElement('img')
    img.src = url
    img.alt = "É a imagem de um QRCODE"
    img.setAttribute('id', `qrcimg${index}`)


    if (adjust) {
        img.classList.add('expanded')
    }

    div.append(img)
    appArea.append(div)
}

function cleanArea() {
    appArea.innerHTML = ''
}

function cleanText() {
    textData.value = ''
}

btnAdd.addEventListener('click', function () {
    cleanArea()

    const selectedType = selectType.options[selectType.selectedIndex].value
    const selectedSize = selectSize.options[selectSize.selectedIndex].value
    const textInfo = textData.value
    takeQRCode(selectedSize, selectedSize, textInfo)
})

btnClean.addEventListener('click', function () {
    cleanArea()
})

btnDelet.addEventListener('click', function () {
    cleanText()
})
function getRandomDice(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

let last = null
let map = { "1": "ONE", "2": "TWO", "3": "THREE", "4": "FOUR", "5": "FIVE", "6": "SIX" }

function reset() {
    this.resetLast()
    this.removeMessage()
}

function resetLast() {
    if(last != null) {
        const lastElement = document.getElementsByClassName(last)[0];
        lastElement.removeAttribute('style')
        lastElement.removeChild(lastElement.getElementsByTagName('span')[0])
        last = null
    }
}

function changeDice() {

    if(!isOver()) {
        changeMessage();
        return;
    }

    let value = getRandomDice(1, 6).toString()

    if(value == last) {
        changeDice()
        return
    }



    this.resetLast()

    const node = document.createElement('span')
    const text = document.createTextNode(map[value])

    node.appendChild(text)

    const element = document.getElementsByClassName(value)[0]
    element.insertBefore(node, element.firstChild)
    element.style.zIndex = "1"

    last = value
    initCooldown()
}

// COOLDOWN 

const button = document.getElementById('roller')
const remaining = document.getElementById('remaining')
const second = 3
end = 0

function isOver() {
    return Date.now() > end
}

function timeRemaining() {

    if(isOver()) {
        return 0;
    }

    return Math.ceil((end - Date.now()) / 1000)
}

function initCooldown() {

    end = Date.now() + (second * 1000)

    const interval = setInterval(() => {

        changeMessage()
        this.setButtonValid(false)

        if(isOver()) {
            clearInterval(interval);
            removeMessage()
            this.setButtonValid(true)
            return;
        }

        changeMessage()

    }, 0, 1000)
}

function setButtonValid(value) {
    if(value) {
        button.removeAttribute('disabled')
    } else {
        button.setAttribute('disabled', null)
    }
}

function changeMessage() {
    remaining.innerHTML = "Please wait " + timeRemaining() + "s before using this again."
}

function removeMessage() {
    remaining.innerHTML = ""
}
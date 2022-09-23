let rootColor 
let mode
let modeArray = ["monochrome", "monochrome-dark", "monochrome-light", "analogic", "complement", "analogic-complement", "triad", "quad"]
let hexCodes = []

function randomize(){
  document.getElementById("eye-dropper").value = getRandomColor()
  document.getElementById("mode-menu").value = getRandomMode()
  getColors()
}


function getRandomMode(){
    let randomNumber = Math.floor(Math.random()*modeArray.length)
    document.getElementById(`value${randomNumber +1}`).setAttribute("selected", "selected")
    randomMode = modeArray[randomNumber]
    return randomMode
}


function getRandomColor() {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }


randomize()


document.getElementById("get-color-button").addEventListener("click", getColors) 
document.getElementById("randomize-button").addEventListener("click", randomize) 



function getColors(){
    hexCodes = []
    rootColor = document.getElementById("eye-dropper").value
    document.body.style.background = rootColor
    hexCodes.push(rootColor)
    rootColor = document.getElementById("eye-dropper").value.slice(1, 7)
    mode = document.getElementById("mode-menu").value 
    fetch (`https://www.thecolorapi.com/scheme?hex=${rootColor}&mode=${mode}&count=10`)
    .then (data => data.json())
    .then (data => {
        for (let i=1; i < 6; i++){
            let value = data.colors[i-1].hex.value
            hexCodes.push(value)
            document.getElementById(`color${i}`).style.background = value
            document.getElementById(`color${i}-name`).innerHTML = `<span id="span${i}">${value}<span>`
            document.getElementById(`span${i}`).style.background = value
    }})}

    for (let i = 1; i < 6; i++){
      document.getElementById(`color${i}`).addEventListener("click", function(){navigator.clipboard.writeText(hexCodes[i-1])})
      document.getElementById(`color${i}-name`).addEventListener("click", function(){navigator.clipboard.writeText(hexCodes[i-1])})
    }

    // document.getElementsByClassName("color-area").map()
    // document.getElementById(`color${i}`).addEventListener("click", navigator.clipboard.writeText(value))
    // document.getElementById(`color${i}-name`).addEventListener("click", navigator.clipboard.writeText(value))
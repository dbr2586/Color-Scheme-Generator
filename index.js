let rootColor 
let mode
let modeArray = ["monochrome", "monochrome-dark", "monochrome-light", "analogic", "complement", "analogic-complement", "triad", "quad"]


function randomize(){
  document.getElementById("eye-dropper").defaultValue = getRandomColor()
  document.getElementById("mode-menu").defaultValue = getRandomMode()
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
    rootColor = document.getElementById("eye-dropper").value
    document.getElementById(`color1`).style.background = rootColor
    document.getElementById(`color1-name`).textContent = rootColor
    rootColor = document.getElementById("eye-dropper").value.slice(1, 7)
    mode = document.getElementById("mode-menu").value 
    fetch (`https://www.thecolorapi.com/scheme?hex=${rootColor}&mode=${mode}&count=4`)
    .then (data => data.json())
    .then (data => {
      console.log(data)
        for (let i=2; i < 6; i++){
            let value = data.colors[i -2].hex.value
            document.getElementById(`color${i}`).style.background = value
            document.getElementById(`color${i}-name`).textContent = value
            document.getElementById(`color${i}`).addEventListener("click", navigator.clipboard.writeText(value))
            document.getElementById(`color${i}-name`).addEventListener("click", navigator.clipboard.writeText(value) )

    }})}
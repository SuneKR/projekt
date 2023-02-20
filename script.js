//import canvasTintImage from './node_modules/canvas-tint-image/index.js'
//import getCanvasContext from './node_modules/get-canvas-context/index.js'
//import AsyncPreloader from './node_modules/async-preloader/lib/index.js'

import canvasTintImage from "canvas-tint-image"
import getCanvasContext from "get-canvas-context"
import AsyncPreloader from "async-preloader"

let canvas = document.getElementById("board")
let context = canvas.getContext("2d")

let cellSize = 50

let tokens = []

canvas.width = Math.floor(window.innerWidth / cellSize) * cellSize
canvas.height = Math.floor(window.innerHeight / cellSize) * cellSize

document.getElementById("board").style.marginLeft = "auto"
document.getElementById("board").style.marginRight = "auto"
canvas.style.display = "block"

const mouse = {
    x: innerWidth/2,
    y: innerHeight/2
}

addEventListener('resize', () => {
    location.reload()
})

addEventListener('mousemove', (event) => {
    mouse.x = event.clientX
    mouse.y = event.clientY
  })

canvas.addEventListener('click', () => {
    let currentX = Math.floor((mouse.x-canvas.getBoundingClientRect().left)/cellSize)
    let currentY = Math.floor((canvas.height-mouse.y+canvas.getBoundingClientRect().top)/cellSize)

    console.log("x: %s, y: %s", currentX, currentY)

    tokens.forEach(token => {
        if(currentX == token.gridX && currentY == token.gridY) {
            token.select()
        }
    })
})


/*
class Token{
    tokenImage = new Image()    

    constructor(imageSource,gridX = Math.floor(Math.random() * Math.floor(window.innerWidth / cellSize)),gridY = Math.floor(Math.random() * Math.floor(window.innerHeight / cellSize)),tokenSize=1){s
        this.tokenImage.src = "tokens/" + imageSource + ".png" 
        this.gridX = gridX
        this.gridY = gridY
        this.tokenSize = tokenSize
    }

    draw(){
        context.drawImage(this.tokenImage, this.gridX*cellSize, this.gridY*cellSize, this.tokenSize*cellSize, this.tokenSize*cellSize)
    }
    //this.addEventListener("click",selected)
    
    onclick = (event) => {  console.log("worked"); this.selected()  }

    addEventListener('click', (MouseEvent) => {
        console.log("worked")
    })

    onClick(event){
        console.log("onclick with class worked")
    }



    selected = function(){
        console.log(this.gridX, this.gridY)
    }

    select(){
        console.log(this.gridX, this.gridY)
    }
}
*/


class Token{
    tokenImage = new Image()

    constructor(imageSource,gridX = Math.floor(Math.random() * Math.floor(window.innerWidth / cellSize)),gridY = Math.floor(Math.random() * Math.floor(window.innerHeight / cellSize)),tokenSize=1){
        this.tokenImage.src = "tokens/" + imageSource + ".png" 
        this.gridX = gridX
        this.gridY = gridY
        this.tokenSize = tokenSize
        this.selected = false
    }

    draw(){
        (async () => {
            const tokenImage = await AsyncPreloader.loadImage({ src: "image.jpg" })
            if(this.selected) {  this.tokenImage = tintImage(this.tokenImage, "#f00", 0.5)  }
            context.drawImage(this.tokenImage, this.gridX*cellSize, (Math.floor(canvas.height/cellSize)-(this.gridY+1))*cellSize, this.tokenSize*cellSize, this.tokenSize*cellSize)
        })();
        console.log("x: %s, y: %s, selected: %s", this.gridX, this.gridY, this.selected)
    }

    onclick = (event) => {  console.log("worked"); this.selected()  }
    
    select(){
        //this.tokenImage.setAttribute('style','img {filter: sepia(100%) saturate(300%) brightness(70%) hue-rotate(180deg);}')
        //this.tokenSize *= 2
        this.selected = true
        console.log("%s: x: %s, y: %s, size: %s",this.tokenImage.src, this.gridX, this.gridY, this.tokenSize)
        //this.tokenImage.onload = false
        update()
        
        
    }
}

class Party {

    setup(){
        for (let i = 1; i < 5; i++) {
            tokens.push(new Token([i]))
        }
    }

    firstTimeDepiction(){
        tokens.forEach(token => {
            token.tokenImage.onload = function(){  token.draw()  }
        });
    }

    laterDepiction(){
        tokens.forEach(token => {
            console.log("in function")
            token.draw()
        });
    }
}

function drawGrid(){
    for (let x = 0; x <= canvas.width; x += cellSize) {
        context.moveTo(x,0)
        context.lineTo(x,canvas.height) 
    }
    for (let y = 0; y < canvas.height; y += cellSize) {
        context.moveTo(0,y)
        context.lineTo(canvas.width,y)
    }

    context.fillStyle='#00ff6a'
    context.fillRect(0,0,canvas.width,canvas.height)
    
    context.strokeStyle ="black"
    context.stroke()
}

function setupBoard(){
    party.setup()
    drawGrid()
    party.firstTimeDepiction()
}

function update(){
    context.clearRect(0, 0, canvas.width, canvas.height)
    drawGrid()
    party.laterDepiction()
}

const party = new Party()

setupBoard()
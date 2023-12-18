document.addEventListener('DOMContentLoaded',() => {
     const grid  = document.querySelector('.grid')
     let squares = Array.from(document.querySelectorAll('.grid div'))
     const scoreDisplay = document.querySelector('#score')
     const startBtn = document.querySelector('#start-button')
     const width = 10 
     let nextRandom = 0
     let timerId 
     let score = 0
     const colors = [
        'orange',
        'red',
        'purple',
        'green',
        'blue'
     ]
})

const lTetromino = [
    [1,width+1,width*2+1,2],
    [width,width+1,width+2,width*2+2],
    [1,width+1,width*2+1,width*2],
    [width ,width*2,width*2+1,width*2+2]
]

const zTetromino = [
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1],
    [0,width,width+1,width*2+1],
    [width+1, width+2,width*2,width*2+1]
]

const tTetromino = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
  ]

  const oTetromino = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
  ]

  const iTetromino = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ]

  const theTetrominoes = [lTetromino,zTetromino,tTetromino,oTetromino,iTetromino]
  
  let currentPosition = 4
  let currentRotation = 0

 /*  console.log(theTetrominoes[0][0]) */

 //select a tetromino and its first rotation 
  let ramdon  =Math.floor(Math.random()*theTetrominoes.length)
  let current =theTetrominoes[ramdon][currentRotation]

  //draw the tetromino
  function draw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.add('tetromino')
        squares[currentPosition + index].style.backgroundColor =colors[random]
    })

  }

  //assign functions to keycodes 
  let canRotate = null ;
  function control(e) {
      if(e.key === "ArrowRight"){
        moveright();
        canRotate="right";
      }else if (e.key === "ArrowUp"){
      rotate();
      canRotate =null;
      }else if (e.key === "ArrowLeft"){
      moveleft();
      canRotate= "left";
      }else if (e.key === "ArrowDown"){
      moveDown();
      canRotate="down";
  }
}
document.addEventListener('keyup',control)

//move down function
function moveDown() {
    currentPosition += width
    draw()
    freeze()
}
//freeze function

function freeze() {
    if(current.some(index => squares[currentPosition + index +width].classList.contains('taken'))) {
        current.forEach(index => squares[currentPosition + index].classList.add('taken'))
        //start a new tetromino falling
        random = nextRandom
        nextRandom =Math.floor(Math.ramdon() * theTetrominoes.length)
        current =theTetrominoes[random][currentPosition]
        currentPosition = 4
        draw()
        displayShape()
        addScore()
        gameOver()
        }

}
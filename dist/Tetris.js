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
  //undraw the tetromino
  function undraw() {
    current.forEach(index => {
        squares[currentPosition + index].classList.remove('tetromino')
        squares[currentPosition + index].style.backgroundColor = ''
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
    undraw()
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
//move the tetromino left ,unless is at the edge or there is a blockage
function moveleft() {
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width ===0)
    if(!isAtLeftEdge) currentPosition -=1
    if(current.some(index => squares[currentPosition +index].classList.contains('taken'))) {
        currentPosition +=1
    }
    draw()
}

function moveRight() {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)
    if(!isAtRightEdge) currentPosition +=1
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition -=1
    }
    draw()
  }

  //fix rotation of tetrominos a the edge
  function isAtRight() {
    return current.some(index =>(currentPosition +index+1) % width === 0 )
  }

  function isAtLeft() {
    return current.some(index=> (currentPosition + index) % width === 0)
  }

  function checkRotatedPosition(P) {
    P = P || currentPosition //get current position.  Then, check if the piece is near the left side.
    if ((P + 1) % width < 4 ) {
        if (isAtRight()){
            currentPosition += 1 
            checkRotatedPosition(P)
        }
    }
    else if (P % width > 5 ){ 
        if (isAtLeft()){
            currentPosition -= 1
            checkRotatedPosition(P)
        }
    }
  }
  //rotate the tetromino 
  function rotate() {
    undraw()
    currentRotation ++ 
    if(currentRotation===current.length) { //if the current rotation gets to 4, make it go back to 0
        currentRotation = 0
    }
    current = theTetrominoes[random][currentRotation]
    checkRotatedPosition()
    draw()
  }
})
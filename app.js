document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector('#score')
    const startBtn = document.querySelector('#start-button')
    const width = 10
    let nextRandom = 0
    let timerId
    let score = 0
    const colors = [
        'rgb(243, 137, 39)',
        'rgb(17, 101, 181)',
        'rgb(235, 79, 101)',
        'rgb(81, 184, 77)',
        'rgb(151, 57, 162)',
        'rgb(246, 208, 60)',
        'rgb(66, 175, 225)'
    ]

    // pieces!
    const lpiece = [
        [0, width, width + 1, width + 2],
        [1, width + 1, width * 2 + 1, 2],
        [width, width + 1, width + 2, width * 2 + 2],        
        [1, width + 1, width * 2 + 1, width * 2]
    
    ]
    
    const jpiece = [
        [width, width + 1, width + 2, 2],
        [1, width + 1, width * 2 + 1, width * 2 + 2],
        [width, width + 1, width + 2, width * 2],
        [0, 1, width + 1, width * 2 + 1]
        
        
    ]

    const zpiece = [
        [width + 1, width + 2, width * 2, width * 2 + 1],
        [1, width + 1, width + 2, width * 2 + 2],
        [width, width + 1, 1, 2],
        [0, width, width + 1, width * 2 + 1]
    ]

    const spiece = [
        [width, width + 1, width * 2 + 1, width * 2 + 2],
        [2, width + 1, width + 2, width * 2 + 1],
        [0, 1, width + 1, width + 2],
        [1, width + 1, width, width * 2]
        
    ]

    const tpiece = [
        [1, width, width + 1, width + 2],
        [1, width + 1, width + 2, width * 2 + 1],
        [width, width + 1, width + 2, width * 2 + 1],
        [1, width, width + 1, width * 2 + 1]
    ]

    const opiece = [
        [1, 2, width + 2, width + 1],
        [1, 2, width + 2, width + 1],
        [1, 2, width + 2, width + 1],
        [1, 2, width + 2, width + 1]
    ]

    const ipiece = [
        [width, width + 1, width + 2, width + 3],
        [2, width + 2, width * 2 + 2, width * 3 + 2],
        [width * 2, width * 2 + 1, width * 2 + 2, width * 2 + 3],
        [1, width + 1, width * 2 + 1, width * 3 + 1]
    ]

    const theTetrominoes = [lpiece, jpiece, zpiece, spiece, tpiece, opiece, ipiece]
    
    let currentPosition = 3
    let currentRotation = 0
  
    console.log(theTetrominoes[0][0])
  
    //randomly select a Tetromino and its first rotation
    let random = Math.floor(Math.random()*theTetrominoes.length)
    let current = theTetrominoes[random][currentRotation]
  
    //draw the Tetromino
    function draw() {
      current.forEach(index => {
        squares[currentPosition + index].classList.add('tetromino')
        squares[currentPosition + index].style.backgroundColor = colors[random]
      })
    }
  
    //undraw the Tetromino
    function undraw() {
      current.forEach(index => {
        squares[currentPosition + index].classList.remove('tetromino')
        squares[currentPosition + index].style.backgroundColor = ''
  
      })
    }
  
    //assign functions to keyCodes
    function control(e) {
        if(e.keyCode === 37) {
            moveLeft()
        } else if (e.keyCode === 81) {
            rotateCounterClockwise()
        } else if (e.keyCode === 69) {
            rotateClockwise()
        } else if (e.keyCode === 87) {
            halfRot()
        } else if (e.keyCode === 39) {
            moveRight()
        } else if (e.keyCode === 40) {
            moveDown()
        } else if (e.keyCode === 32) {
            hardDrop()
        }
    }
    document.addEventListener('keyup', control)
  
    //move down function
    function moveDown() {
      undraw()
      currentPosition += width
      draw()
      freeze()
    }
  
    //freeze function
    function freeze() {
      if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
        current.forEach(index => squares[currentPosition + index].classList.add('taken'))
        //start a new tetromino falling
        random = nextRandom
        nextRandom = Math.floor(Math.random() * theTetrominoes.length)
        current = theTetrominoes[random][currentRotation]
        currentPosition = 3
        draw()
        displayShape()
        addScore()
        gameOver()
      }
    }
  
    // left side barrier
    function moveLeft() {
      undraw()
      const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
      if(!isAtLeftEdge) currentPosition -=1
      if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition +=1
      }
      draw()
    }
  
    // right side barrier
    function moveRight() {
      undraw()
      const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)
      if(!isAtRightEdge) currentPosition +=1
      if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition -=1
      }
      draw()
    }
  
    
    // rotation at edge
    function isAtRight() {
      return current.some(index=> (currentPosition + index + 1) % width === 0)  
    }
    
    function isAtLeft() {
      return current.some(index=> (currentPosition + index) % width === 0)
    }
    
    function checkRotatedPosition(P){
      P = P || currentPosition      
      if ((P+1) % width < 4) {        
        if (isAtRight()){            
          currentPosition += 1    
          checkRotatedPosition(P) 
          }
      }
      else if (P % width > 5) {
        if (isAtLeft()){
          currentPosition -= 1
        checkRotatedPosition(P)
        }
      }
    }
    
    // rotation in 3 ways
    function rotateClockwise() {
        undraw()
        currentRotation ++

        if(currentRotation  === current.length) {
            currentRotation  = 0
        }

        current = theTetrominoes[random][currentRotation]
        checkRotatedPosition()
        draw()
    }

    function rotateCounterClockwise() {
        undraw()
        currentRotation --

        if(currentRotation  === -1) {
            currentRotation  = 3
        }

        current = theTetrominoes[random][currentRotation]
        checkRotatedPosition()
        draw()
    }

    function halfRot() {
        undraw()
        if(currentRotation  === 0){
            currentRotation  = 2
        } else if(currentRotation  === 1){
            currentRotation  = 3
        } else if(currentRotation  === 2){
            currentRotation  = 0
        } else if (currentRotation  === 3){
            currentRotation  = 1
        }
        current = theTetrominoes[random][currentRotation]
        checkRotatedPosition()
        draw()
    }
    
    function hardDrop() {
        undraw()
        while (!current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
            currentPosition += width
        }
        draw()
        freeze()
        freeze()
        
    }
  
    
    
    //show up-next tetromino in mini-grid display
    const displaySquares = document.querySelectorAll('.mini-grid div')
    const displayWidth = 4
    const displayIndex = 0
    const width2 = 4
  
  
    //the Tetrominos without rotations
    const upNextTetrominoes = [
        [0, width2, width2 + 1, width2 + 2], // lpiece
        [width2, width2 + 1, width2 + 2, 2], // jpiece
        [width2 + 1, width2 + 2, width2 * 2, width2 * 2 + 1], // zpiece
        [width2, width2 + 1, width2 * 2 + 1, width2 * 2 + 2], // spiece
        [width2 + 1, width2 * 2, width2 * 2 + 1, width2 * 2 + 2], // tpiece 
        [width2 * 2 + 1, width2 * 2 + 2, width2 + 2, width2 + 1], // opiece
        [width2, width2 + 1, width2 + 2, width2 + 3] // ipiece
    ]
  
    //display the shape in the mini-grid display
    function displayShape() {
      //remove any trace of a tetromino form the entire grid
      displaySquares.forEach(square => {
        square.classList.remove('tetromino')
        square.style.backgroundColor = ''
      })
      upNextTetrominoes[nextRandom].forEach( index => {
        displaySquares[displayIndex + index].classList.add('tetromino')
        displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom]
      })
    }
  
    //add functionality to the button
    startBtn.addEventListener('click', () => {
      if (timerId) {
        clearInterval(timerId)
        timerId = null
      } else {
        draw()
        timerId = setInterval(moveDown, 1000)
        nextRandom = Math.floor(Math.random()*theTetrominoes.length)
        displayShape()
      }
    })
  
    //add score
    function addScore() {
      for (let i = 0; i < 199; i +=width) {
        const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]
  
        if(row.every(index => squares[index].classList.contains('taken'))) {
          score +=10
          scoreDisplay.innerHTML = score
          row.forEach(index => {
            squares[index].classList.remove('taken')
            squares[index].classList.remove('tetromino')
            squares[index].style.backgroundColor = ''
          })
          const squaresRemoved = squares.splice(i, width)
          squares = squaresRemoved.concat(squares)
          squares.forEach(cell => grid.appendChild(cell))
        }
      }
    }
  
    //game over
    function gameOver() {
      if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        scoreDisplay.innerHTML = 'end'
        clearInterval(timerId)
      }
    }
  
})
document.addEventListener('DOMContentLoaded', () =>{
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector('#score')
    const startBtn = document.querySelector('#start-button')
    const width = 10

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

    const tetrominoes = [lpiece, jpiece, zpiece, spiece, tpiece, opiece, ipiece]
    
    // base position
    let currentpos = 3
    let currentrot = 0

    // queue selector
    let random =  Math.floor(Math.random()*tetrominoes.length)
    let current = tetrominoes[random][currentrot]
    

    // display
    function draw() {
        current.forEach(index => {
            squares[currentpos + index].classList.add('tetromino')
        })
    }

    draw()

    function undraw() {
        current.forEach(index => {
            squares[currentpos + index].classList.remove('tetromino')
        })
        
    }

    // basic gravity implementation.
    timerId = setInterval(moveDown, 1000)

    function moveDown() {
        undraw()
        currentpos += width
        draw()
        freeze()
        
    }

    // setup controls
    function control(e) {
        if(e.keyCode === 37) {
            moveLeft()
        } else if (e.keyCode === 69) {
            rotateClockwise()
        } else if (e.keyCode === 81) {
            rotateCounterClockwise()
        } else if (e.keyCode === 87) {
            halfRot()
        } else if (e.keyCode === 32) {
            //hardDrop()
        } else if (e.keyCode === 39) {
            moveRight()
        } else if (e.keyCode === 40) {
            //softDrop()
            moveDown()
        } else if (e.keyCode === 38) {
            //holdPiece()
        }
    }
    document.addEventListener('keyup', control)

    // collision detection  (bottom)
    function freeze() {
        if(current.some(index => squares[currentpos + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentpos + index].classList.add('taken'))

            // stop the falling piece
            random = Math.floor(Math.random() * tetrominoes.length)
            current = tetrominoes[random][currentrot]
            currentpos = 3
            draw()
        }
    }

    // collision detection   (left right)
    function moveLeft() {
        undraw()
        const atleftedge = current.some(index => (currentpos + index) % width === 0)

        if(!atleftedge) currentpos -= 1
        
        if(current.some(index => squares[currentpos + index].classList.contains('taken'))) {
            currentpos += 1
            draw()
        }
        if(current.some(index => squares[currentpos + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentpos + index].classList.add('taken'))

            // stop the falling piece
            random = Math.floor(Math.random() * tetrominoes.length)
            current = tetrominoes[random][currentrot]
            currentpos = 3
            draw()
        } else {
            draw()
        }

    }

    function moveRight() {
        undraw()
        const atrightedge = current.some(index => (currentpos + index) % width === width - 1)

        if (!atrightedge) currentpos += 1

        if (current.some(index => squares [currentpos + index].classList.contains('taken'))) {
            currentpos -= 1
            draw()
        }
        if(current.some(index => squares[currentpos + index + width].classList.contains('taken'))) {
            current.forEach(index => squares[currentpos + index].classList.add('taken'))

            // stop the falling piece
            random = Math.floor(Math.random() * tetrominoes.length)
            current = tetrominoes[random][currentrot]
            currentpos = 3
            draw()
        } else {
            draw()
        }
    }

    // rotation in 3 ways
    function rotateClockwise() {
        undraw()
        currentrot++

        if(currentrot === current.length) {
            currentrot = 0
        }

        current = tetrominoes[random][currentrot]
        draw()
    }

    function rotateCounterClockwise() {
        undraw()
        currentrot--

        if(currentrot === -1) {
            currentrot = 3
        }

        current = tetrominoes[random][currentrot]
        draw()
    }

    function halfRot() {
        undraw()
        if(currentrot === 0){
            currentrot = 2
        } else if(currentrot === 1){
            currentrot = 3
        } else if(currentrot === 2){
            currentrot = 0
        } else if (currentrot === 3){
            currentrot = 1
        }
        current = tetrominoes[random][currentrot]
        draw()
    }



    // make a queue
    const displaySquares = document.querySelectorAll('.queue div')
    const displayWidth = 4
    let displayIndex = 0
    var piecearray = [0, 1, 2, 3, 4, 5, 6];

    // all pieces w/o rotations
    const upNext = [
        [0, width, width + 1, width + 2], // lpiece
        [width, width + 1, width + 2, 2], // jpiece
        [width + 1, width + 2, width * 2, width * 2 + 1], // zpiece
        [width, width + 1, width * 2 + 1, width * 2 + 2], // spiece
        [1, width, width + 1, width + 2], // tpiece 
        [1, 2, width + 2, width + 1], // opiece
        [width, width + 1, width + 2, width + 3] // ipiece
    ]

    // shuffle helper
    function shuffle(arra1) {
        var ctr = arra1.length, temp, index;
    
        while (ctr > 0) {
    
            index = Math.floor(Math.random() * ctr);
            ctr--;
            temp = arra1[ctr];
            arra1[ctr] = arra1[index];
            arra1[index] = temp;
        }
        return arra1;
    }
    
    //console.log(shuffle(myArray));

})
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
        [0, width, width + 1, width * 2 + 1],
        [width, width + 1, 1, 2],
        [1, width + 1, width + 2, width * 2 + 2]
    ]

    const spiece = [
        [width, width + 1, width * 2 + 1, width * 2 + 2],
        [1, width + 1, width, width * 2],
        [0, 1, width + 1, width + 2],
        [2, width + 1, width + 2, width * 2 + 1]
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
    let startpos = 3
    let startrot = 0

    // queue selector
    let random =  Math.floor(Math.random()*tetrominoes.length)
    let current = tetrominoes[random][startrot]
    

    // display
    function draw() {
        current.forEach(index => {
            squares[startpos + index].classList.add('tetromino')
        })
    }

    draw()

    function undraw() {
        current.forEach(index => {
            squares[startpos + index].classList.remove('tetromino')
        })
    }

    // basic gravity implementation.

})
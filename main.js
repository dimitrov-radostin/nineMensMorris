const board = document.getElementById('boardContainer')
// dragable tokens
document.addEventListener('mousedown', e => {
    if(e.target.classList.contains('token')) {
        const token = e.target
        const delX = token.getBoundingClientRect().x - e.clientX
        const delY = token.getBoundingClientRect().y - e.clientY
        const follow = e => {
            x = e.clientX;
            y = e.clientY;     
            token.style.left = x + delX + 'px';
            token.style.top = y + delY + 'px';
        }

        document.addEventListener('mousemove', follow, false);
        document.addEventListener('mouseup', e => {
            document.removeEventListener('mousemove', follow)
        }) 
    }
})

// boardNodes generation
for (let ring = 1; ring <= 3; ring++) {
    for (let x = 0; x <= 2; x++) {
        for (let y = 0; y <= 2; y++) {
            if(x * y === 1) continue
            const boardNode = document.createElement('div')
            boardNode.className = 'boardNode'
            boardNode.id = '' + ring + x + y
            boardNode.style.gridColumnStart = 2 + ring * x + 3 - ring
            boardNode.style.gridRowStart = 2 + ring * y + 3 - ring
            board.appendChild(boardNode)
            // could be optimized to add all children at once
        }
    }
}

//spawn tokens
function spawnToken(id, player){
    let newTokenElement = document.createElement('div')
    newTokenElement.classList.add('token')
    newTokenElement.id = id
    let left = player == 1 ? 3 : 23 + board.offsetWidth / document.documentElement.clientHeight * 100
    newTokenElement.style.left = left + Math.random() * 12 + 'vh'
    newTokenElement.style.top = '0vh'
    document.body.appendChild(newTokenElement)

    console.log(board.offsetHeight)
    let finalTop = board.clientHeight * ( 0.34 + 0.32 * Math.random()) / document.documentElement.clientHeight * 100
    console.log(board, 'final top  ', finalTop)
    let speed = 0.6 + 0.5 * Math.random() 

    requestAnimationFrame(()=>{})
    function fall() {
        let oldTop = parseFloat(newTokenElement.style.top)
        newTokenElement.style.top = oldTop + speed + 'vh'
        if (oldTop < finalTop) {
          window.requestAnimationFrame(fall);
        }
      }
      
      window.requestAnimationFrame(fall);
}
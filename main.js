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
    newTokenElement = document.createElement('div')
    newTokenElement.classList.add('token')
    newTokenElement.style.left = 3 + Math.random() * 12 + 'vh'
    newTokenElement.style.top = '1vh'
    document.body.appendChild(newTokenElement)

    console.log(board.clientHeight)
    finalTop = board.clientHeight * ( 0.4 + 0.2 * Math.random())
    console.log('yyyyyy  ' + finalTop)
    speed = 1 + Math.random() 
    requestAnimationFrame(()=>{})
    function fall() {
        oldTop = parseInt(newTokenElement.style.top, 10)
        console.log(oldTop)
        newTokenElement.style.top = oldTop + speed + 'px'

        if (oldTop < finalTop) {
          window.requestAnimationFrame(fall);
        }
      }
      
      window.requestAnimationFrame(fall);
}
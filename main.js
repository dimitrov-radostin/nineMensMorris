const board = document.getElementById('boardContainer')
// dragable tokens
var draggedToken = null
var delX 
var delY

const follow = e => {
    if(!draggedToken){
        draggedToken = e.target
        delX = draggedToken.getBoundingClientRect().x - e.clientX
        delY = draggedToken.getBoundingClientRect().y - e.clientY     
    }  
    x = e.clientX;
    y = e.clientY;    
    draggedToken.style.left = x + delX + 'px';
    draggedToken.style.top = y + delY + 'px';
}

document.addEventListener('mousedown', e => {
    if(e.target.classList.contains('token')) {
        document.addEventListener('mousemove', follow, false)
    }
})

document.addEventListener('mouseup', e => {
    document.removeEventListener('mousemove', follow)
    closestNode = findClosestNode(e.clientX, e.clientY)
    if (closestNode){
        placeOnNode(draggedToken, closestNode)
    }
    draggedToken = null
}) 

function findClosestNode(x, y){
    console.log('droped!!!!!!!')
    const nodes = document.getElementsByClassName("boardNode")
    let { closest, minDistance } = Array.from(nodes).reduce(({ closest, minDistance }, node) => {
        let distance = Math.sqrt( ( x - node.getBoundingClientRect().x )** 2 + 
                                 ( y - node.getBoundingClientRect().y )** 2 )
        if (distance < minDistance){
            return { closest: node, minDistance: distance }
        }else{
            return { closest: closest, minDistance: minDistance }
        }
    }, { closest: this[0], minDistance: Infinity })
    
    return minDistance < 200 ? closest : null
}

function placeOnNode(token, node){
    x = node.getBoundingClientRect().x + node.clientHeight / 2 - token.clientHeight / 2
    y = node.getBoundingClientRect().y + node.clientHeight / 2 - token.clientHeight / 2
    token.style.left = x + 'px'
    token.style.top = y + 'px'
}
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
    newTokenElement.style.background = player == 1 ? 'rgb(41, 230, 85, 0.9)' : 'rgb(75, 145, 250, 0.9)'
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
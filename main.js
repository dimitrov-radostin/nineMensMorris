minDistanceToStickToANode = 200
const board = document.getElementById('boardContainer')

// dragable tokens
var draggedToken = null
var closestNodeId = null
var delX 
var delY

const follow = e => {
    if(!draggedToken && e.target.classList.contains('token')){
        draggedToken = e.target
        delX = draggedToken.getBoundingClientRect().x - e.clientX
        delY = draggedToken.getBoundingClientRect().y - e.clientY     
    }  
    x = e.clientX;
    y = e.clientY;    
    draggedToken.style.left = x + delX + 'px';
    draggedToken.style.top = y + delY + 'px';
    // find and color closest node
    findAndColourClosestNode(x, y)
}

document.addEventListener('mousedown', e => {
    if(e.target.classList.contains('token')) {
        // show available nodes
        document.addEventListener('mousemove', follow, false)
    }
})

document.addEventListener('mouseup', e => {
    if(draggedToken){
        console.log('dropped!!!!!')
        document.removeEventListener('mousemove', follow)

        findAndColourClosestNode(e.clientX, e.clientY)
        if (closestNodeId){
            placeTokenOnNode(draggedToken.id, closestNodeId)
            tokens.findById(draggedToken.id).place(closestNodeId)
        }
        draggedToken = null
        closestNodeId = null
    }
}) 

function findAndColourClosestNode(x, y){
    // changes a globl variable return 
    // console.log(tokens.findById(draggedToken.id)
    // .getAvailableNodesForToken())
    let {closestNode, minDistance} = tokens.findById(draggedToken.id)
        .getAvailableNodesForToken()
        .reduce(({ closestNode, minDistance }, node) => {
            nodePosition = document.getElementById(node.id).getBoundingClientRect()
            let distance = Math.sqrt( ( x - nodePosition.x )** 2 + 
                                        ( y - nodePosition.y )** 2 )
            if (distance < minDistance){
                return { closestNode: node, minDistance: distance }
            }else{
                return { closestNode: closestNode, minDistance: minDistance }
            }
        }, { closestNode: null, minDistance: Infinity })

    if(minDistance > 200){
        decolourNode(closestNodeId)
        closestNodeId = null
        console.log("mn si dalech aj chao")
        return false
    }

    if(closestNode.id != closestNodeId) {
        console.log('opa toz tuka e po blizo ai chao')
        if(closestNodeId) decolourNode(closestNodeId)

        closestNodeId = closestNode.id
        colourNode(closestNodeId)
        return true
    }
    console.log('da ue brat vijdam go')
}

function placeTokenOnNode(tokenId, nodeId){
    let token = document.getElementById(tokenId)
    let node = document.getElementById(nodeId)
    console.log('placing token')
    x = node.getBoundingClientRect().x + node.clientHeight / 2 - token.clientHeight / 2
    y = node.getBoundingClientRect().y + node.clientHeight / 2 - token.clientHeight / 2
    token.style.left = x + 'px'
    token.style.top = y + 'px'
}

// boardNodes generation
boardNodes.forEach(({ id }) => {
            const boardNode = document.createElement('div')
            boardNode.className = 'boardNode'
            boardNode.id = id 
            boardNode.style.gridColumnStart = 5 + id[0] * ( id[1] -1 )
            boardNode.style.gridRowStart = 5 + id[0] * ( id[2] - 1 )
            board.appendChild(boardNode)
            // could be optimized to add all children at once
});

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

    let finalTop = board.clientHeight * ( 0.34 + 0.32 * Math.random()) / document.documentElement.clientHeight * 100
    let speed = 0.6 + 0.5 * Math.random() 

    requestAnimationFrame(()=>{})
    function fall() {
        let oldTop = parseFloat(newTokenElement.style.top)
        newTokenElement.style.top = oldTop + speed + 'vh'
        if (oldTop < finalTop) {
          requestAnimationFrame(fall);
        }
      }
      
      requestAnimationFrame(fall);
}


// colour node
function colourNode(id) {
    let node = document.getElementById(id)
    node.style.backgroundColor = 'yellow'
}
function decolourNode(id) {
    let node = document.getElementById(id)
    node.style.backgroundColor = 'rgba(158, 21, 170, 0.377)'
}
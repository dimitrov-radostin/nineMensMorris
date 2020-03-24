const board = document.getElementById('boardContainer')
// dragable tokens
document.addEventListener('mousedown', e => {
    if(e.target.className == 'token') {
        const token = e.target
        const delX = token.getBoundingClientRect().x - e.clientX
        const delY = token.getBoundingClientRect().y - e.clientY
        const follow = e => {
            x = e.clientX;
            y = e.clientY;     
            token.style.left = x + delX + "px";
            token.style.top = y + delY + "px";
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
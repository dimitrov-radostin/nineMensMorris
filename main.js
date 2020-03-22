var board = document.getElementById('board')

document.addEventListener('click', e => {
    console.log('click on document')
    if(e.target.className == 'token') {
        var token = e.target
        var delX = token.getBoundingClientRect().x - e.clientX
        var delY = token.getBoundingClientRect().y - e.clientY
        var follow = e => {
            x = e.clientX;
            y = e.clientY;     
            token.style.left = x + delX + "px";
            token.style.top = y + delY + "px";
        }

        document.addEventListener('mousemove', follow, false);
        board.addEventListener('click', e => {
            console.log('hi')// not happening all the clicks are on the token that follow the mouse
            document.removeEventListener('mousemove', follow)
        }) 
    }
})


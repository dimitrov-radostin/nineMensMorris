tokens = {
    player1: [],
    player2: [],
    killToken(id) {
        // find by id
        //  token.die() 
    },
    placeToken(id, position){

    },

}

class Token {
    constructor ({ player, id }) {
        console.log(id)
        this.player = player 
        this.onBoard = false
        this.dead = false
        this.inAMill = false
        this.flyble = false
        this.position = null
        spawnToken(id)
    }
    die(){
        this.dead
    }
    place(position){
        this.position = position
        // check if its in a mill
    }
    makeFlyable(){}
}

(function create(id){
        setTimeout(() => {
            if (id <= 17){
                player = (9 - tokens.player1.length) / (9 - tokens.player2.length ) > Math.random() ? 1 : 2
                token = new Token({ id, player })
                tokens['player' + player].push(token)
                create(++id)
            }
        }, 300 * Math.random())
})(0)



boardNodes = []
boardNodes.findById = id => boardNodes.find(e => e.id == id)
boardNodes.getUnoccupied = () => boardNodes.filter(e => !e.isOccupied)

tokens = {
    player1: [],
    player2: [],
    killToken(id) {
        // find by id
        //  token.die() 
    },
    placeToken(id, position){

    },
    findById(id){
        return tokens.player1.concat(tokens.player2).find(e => (e.id == id))
    }
}


class Token {
    constructor ({ player, id }) {
        console.log(id)
        this.id = id
        this.player = player 
        this.onBoard = false
        this.dead = false
        this.inAMill = false
        this.flyble = false
        this.position = null
        spawnToken(id, player)
    }
    die(){
        this.dead = true
    }
    place(position){
        let oldNode = boardNodes.findById(this.position)
        if(oldNode) oldNode.isOccupied = false
        let newNode = boardNodes.findById(position)
        newNode.isOccupied = true 
        this.position = position
        // check if its in a mill
    }
    makeFlyable(){}
    getAvailableNodesForToken(){
        if(!this.position || this.flyable){
            return boardNodes.getUnoccupied()
        }else{
            // nodes connected to the current one
        }
    }
}


// Generating the tokens
(function create(id){
        setTimeout(() => {
            if (id <= 17){
                player = (9 - tokens.player1.length) / (9 - tokens.player2.length ) > Math.random() ? 1 : 2
                token = new Token({ id, player })
                tokens['player' + player].push(token)
                create(++id)
            }
        }, 250 * Math.random())
})(0)

// Genrating the nodes
for (let ring = 1; ring <= 3; ring++) {
    for (let x = 0; x <= 2; x++) {
        for (let y = 0; y <= 2; y++) {
            if(x * y === 1) continue
            //happy little classless objects
            boardNodes.push({
                id: '' + ring + x + y,
                isOccupied: false
            })
        }
    }
}

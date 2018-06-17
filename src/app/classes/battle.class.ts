import { Army } from './army.class';

// will be stored in DB for multiplayer games
export class Battle {

    name?: string
    player1Army?: Army
    player2Army?: Army
    whoseTurn?: string // ref of which player is active
    player1?: string // playerRef
    player2?: string // playerRef or AI
    battleRef?: string

    constructor(params: Battle = {}) {
        
        this.name = params.name || null
        this.player1Army = params.player1Army || null
        this.player2Army = params.player2Army || null
        this.whoseTurn = params.whoseTurn || null
        this.player1 = params.player1 || null
        this.player2 = params.player2 || null
        this.battleRef = params.battleRef || null
    }
}
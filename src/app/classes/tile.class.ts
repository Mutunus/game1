export class Tile {

    name?: string
    description?: string

    constructor(params: Tile = {}) {
        
        this.name = params.name || null
        this.description = params.description || null
    }
}

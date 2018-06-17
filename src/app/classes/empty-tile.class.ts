import { Tile } from './tile.class';

export class EmptyTile extends Tile {

    constructor() {
        super({name: 'Empty Tile', description: 'A desolate wasteland'})
    }
    
}
import { Unit } from './unit.class';

export class Army {

    name?: string
    description?: string
    unitRefs?: string[]
    armyRef?: string
    default?: boolean

    constructor(params: Army = {}) {
        
        this.name = params.name || null
        this.description = params.description || null
        this.unitRefs = params.unitRefs || []
        this.armyRef = params.armyRef || null
        this.default = params.default || false
    }
}
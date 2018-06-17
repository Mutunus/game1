import { Situation } from './situation.class';

export class Unit {

    strength?: number
    attack?: number
    defence?: number
    morale?: number
    movement?: number
    name?: string
    description?: string
    default?: boolean
    defeated?: boolean
    allegiance?: string // ref of player, only applied at battle init
    special?: 'commander'
    situation?: Situation // special state e.g. if flanked
    currentStrength?: number // strenth minus battle losses
    currentMorale?: number // morale minus battle losses. can raise to a maximum of starting morale
    orientation?: 'north' | 'east' | 'south' | 'west' // determines direction unit is facing during battle
    unitRef?: string // primary key in db

    constructor(params: Unit = {}) {
        this.strength = params.strength || 0
        this.attack = params.attack || 0
        this.defence = params.defence || 0
        this.morale = params.morale || 0
        this.movement = params.movement || 1
        this.name = params.name || null
        this.description = params.description || null
        this.default = params.default || false
        this.defeated = params.defeated || false
        this.allegiance = params.allegiance || null
        this.special = params.special || null
        this.situation = params.situation || new Situation()
        this.currentStrength = params.currentStrength || this.strength
        this.currentMorale = params.currentMorale || this.morale
        this.orientation = params.orientation || null
        this.unitRef = params.unitRef || null
    }

}
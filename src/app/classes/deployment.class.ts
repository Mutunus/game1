import { Unit } from './unit.class';

export class Deployment {

    firstRow?: Unit[]
    secondRow?: Unit[]

    constructor(params: Deployment = {}) {
        
        this.firstRow = params.firstRow || []
        this.secondRow = params.secondRow || []
    }
}
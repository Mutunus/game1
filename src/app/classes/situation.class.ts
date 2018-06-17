export class Situation {

    flanked?: boolean

    constructor(params: Situation = {}) {
        
        this.flanked = params.flanked || false
    }
}
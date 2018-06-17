import { Deployment } from './deployment.class';

export class BattleDeployment {

    yourDeployment?: Deployment
    opponentDeployment?: Deployment

    constructor(params: BattleDeployment = {}) {
        
        this.yourDeployment = params.yourDeployment || new Deployment()
        this.opponentDeployment = params.opponentDeployment || new Deployment()
    }
}
import { Player } from './player.class';
import { BattleDeployment } from './battle-deployment.class';
import { Deployment } from './deployment.class';
import { Settings } from './settings.class';
import { Battle } from './battle.class';
import { Army } from './army.class';
import { Unit } from './unit.class'

export class AppState {
    
    units: Unit[]
    armies: Army[]
    battle: Battle
    deployment: BattleDeployment
    settings: Settings
    user: Player

    constructor() {
        this.units = []
        this.armies = []
        this.battle = null
        this.deployment = null
        this.settings = new Settings()
        this.user = new Player()
    }
    
}
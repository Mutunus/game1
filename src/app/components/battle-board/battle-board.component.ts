import { DebugService } from './../../services/debug.service';
import { StoreService } from './../../services/store.service';
import { Player } from './../../classes/player.class';
import { Tile } from './../../classes/tile.class';
import { BattleDeployment } from './../../classes/battle-deployment.class';
import { Deployment } from './../../classes/deployment.class';
import { EmptyTile } from './../../classes/empty-tile.class';
import { ArmyService } from './../../services/army.service';
import { Battle } from './../../classes/battle.class';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Unit } from './../../classes/unit.class';
import { BattleEventsService } from './../../services/battle-events.service';
import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'battle-board',
    templateUrl: './battle-board.template.html',
    styleUrls: ['./battle-board.scss']
})

export class BattleBoard {

    public battle$: Observable<Battle>
    public deployment$: Observable<BattleDeployment>
    public battleBoard
    private boardHeight: number
    private boardWidth: number
    public title: string
    public youUnits$: Observable<Unit[]>
    public selectedUnit: Unit
    public user: Player

    constructor(
    private armyService: ArmyService,
    private storeService: StoreService,
    private debug: DebugService,
    private store: Store<any>,
    private event: BattleEventsService) {

        this.battleBoard = []
        this.boardWidth = 14
        this.boardHeight = 12
        this.user = this.storeService.getItems(this.store.select(state => state.data.user))
    }

    ngOnInit() {
        this.battle$ = this.store.select(state => state.data.battle)
        this.deployment$ = this.store.select(state => state.data.deployment)
        this.buildBattleBoard(0)
        this.deployUnits(this.deployment$, this.battleBoard)
    }

    deployUnits(deployment$: Observable<BattleDeployment>, battleBoard: Array<any>) {

        // determine which player goes first and deploy them in the south deplyoment zone

        deployment$.subscribe(deployment => {

            //console.log(deployment);

            [...deployment.yourDeployment.firstRow, ...deployment.yourDeployment.secondRow].forEach(unit => {
                unit.allegiance = '123456'
                unit.orientation = 'north'
            });
            [...deployment.opponentDeployment.firstRow, ...deployment.opponentDeployment.secondRow].forEach(unit => {
                unit.allegiance = 'AI'
                unit.orientation = 'south'
            });
            
            deployment.yourDeployment.firstRow.forEach((unit, i) => battleBoard[this.boardHeight - 1][i + 2] = unit)
            deployment.yourDeployment.secondRow.forEach((unit, i) => battleBoard[this.boardHeight][i + 2] = unit)

            deployment.opponentDeployment.firstRow.forEach((unit, i) => battleBoard[1][i + 2] = unit)
            deployment.opponentDeployment.secondRow.forEach((unit, i) => battleBoard[0][i + 2] = unit)

           // deployment.yourDeployment.firstRow.forEach((unit, i) => this.combat(unit, deployment.opponentDeployment.firstRow[i]))            
           // deployment.yourDeployment.secondRow.forEach((unit, i) => this.combat(unit, deployment.opponentDeployment.secondRow[i]))
        })
    }

    // can only move 1 unit per turn
    // however all units may attack if they are orientated towards an enemy unit
    // units that are not adjacent to an enemy unit may recover morale at the end of a turn

    // builds y * x board of empty tile objects
    buildBattleBoard(y: number) {
        this.battleBoard.push([])
        for(let x = 0; x != this.boardWidth; x++) {
            this.battleBoard[y].push(new EmptyTile())
        }
        if(y != this.boardHeight) this.buildBattleBoard(y + 1)
    }

    combat(attacker: Unit, defender: Unit) {
        //if(defender.special && defender.special === 'commander') this.store.dispatch({ type: 'gameOver' })
        let combatResults = this.event.resolveCombat(attacker, defender)
        this.debug.log(attacker, defender, combatResults)
        // display combat results on screen
    }

    move() {

    }

    clickTile(tile: Unit) {
        if(tile.constructor === Unit) {
            if(this.selectedUnit && tile.allegiance != this.user.playerRef) {
                // enemy is adjacent to selected unit && selectedUnit is facing enemty unit
                // initiate combat
            }
            else if(tile.allegiance === this.user.playerRef) this.selectedUnit = tile
        }
        else if(tile.constructor === Tile && this.selectedUnit) {
            // && selected unit is adjacent to tile and is facing tile
            // initiate movement
        }
    }

}

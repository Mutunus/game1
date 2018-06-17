import { Player } from './../../classes/player.class';
import { StoreService } from './../../services/store.service';
import { DragulaService } from 'ng2-dragula/ng2-dragula';
import { EmptyTile } from './../../classes/empty-tile.class';
import { ArmyService } from './../../services/army.service';
import { Battle } from './../../classes/battle.class';
import { Deployment } from './../../classes/deployment.class';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Unit } from './../../classes/unit.class';
import { BattleEventsService } from './../../services/battle-events.service';
import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash'
import { Router } from '@angular/router';
import 'rxjs/add/observable/zip';

@Component({
    selector: 'unit-deployment',
    templateUrl: './deployment.template.html',
    styleUrls: ['./deployment.scss']
})

// need to deploy units before beginning

export class BattleDeployment {

    public battle$: Observable<Battle>
    private player$: Observable<Player>
    private boardWidth: number
    private title: string
    public yourUnits: Unit[]
    public yourDeployment: Deployment
    public opponentUnits: Unit[]
    public opponentDeployment: Deployment
    public hoverUnit: Unit
    private user: Player
    public message: string

    constructor(
    private armyService: ArmyService,
    private store: Store<any>,
    private storeService: StoreService,
    private event: BattleEventsService,
    private router: Router,
    private dragulaService: DragulaService) {
        this.yourUnits = []
        this.boardWidth = 10
        this.yourDeployment = new Deployment()
        this.opponentDeployment = new Deployment()
        this.user = this.storeService.getItems(this.store.select(state => state.data.user))
    }

    ngOnInit() {
        this.battle$ = this.store.select(state => state.data.battle)
        this.player$ = this.store.select(state => state.data.user)
        // Observable.zip(this.battle$, this.player$)
        // .subscribe(x => {
        //     console.log(x)
        // })
        this.battle$.subscribe(battle => {
            this.yourUnits = this.armyService.createArmyUnits(battle.player1Army).map(unit => _.clone(unit))
        }).unsubscribe()
    }
    
    toBattle(yourDeployment: Deployment, opponentDeployment: Deployment) {

        this.store.dispatch({ type: 'updateAppState', payload: { deployment: { yourDeployment, opponentDeployment } } }) 
        this.router.navigateByUrl('/battle/arena')
    }

}

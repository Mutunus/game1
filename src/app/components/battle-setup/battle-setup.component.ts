import { StoreService } from './../../services/store.service';
import { Army } from './../../classes/army.class';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import * as uuid from 'uuid/v4'

import { Deployment } from './../../classes/deployment.class';
import { ArmyService } from './../../services/army.service';


@Component({
    selector: 'battle-setup',
    templateUrl: './battle-setup.template.html',
    styleUrls: ['./battle-setup.scss']
})

// for multiplayer
// list of availab

// choose armies to face eachother
export class BattleSetup {

    public form: FormGroup
    public armies$: Observable<Army[]>
    public message: string
    public multiplayer: boolean

    constructor(
    private armyService: ArmyService, // testing, remove later
    private fb: FormBuilder,
    private router: Router,
    private storeService: StoreService,
    private store: Store<any>) {

        this.multiplayer = false
    }

    ngOnInit() {
        this.form = this.createForm()
        this.armies$ = this.store.select(state => state.data.armies)
        // this.players$
    }

    createForm() {
        return this.fb.group({
            name: [null, Validators.required],
            player1Army: [null, Validators.required],
            player2Army: [null, Validators.required],
            player1: [this.storeService.getItems(this.store.select(state => state.data.user)), Validators.required],
            player2: ['AI', Validators.required],
            battleRef: uuid()
        })
    }

    setOpponentControls() {
        // if multiplayer then add opponentRef control and change player2 control value to null
        // else remove multiplayer control and change player2 control value to AI
        // opponentRef: [null, Validators.required]
    }
    
    setBattleName() {
        if(this.form.get('name').pristine) {
            let name = `${this.form.get('player1Army').value ? this.form.get('player1Army').value.name : ''} vs. ${this.form.get('player2Army').value ? this.form.get('player2Army').value.name : ''}`
            this.form.patchValue({ name })
        }
    }

    goToArena() {
        this.store.dispatch({ type: 'updateAppState', payload: { battle: this.form.value } }) 
        this.router.navigateByUrl('/battle/deployment')
    }

    test() {
        let yourDeployment = new Deployment()
        let opponentDeployment = new Deployment()

        console.log(this.form.value)

        this.form.value.player1Army.unitRefs = this.armyService.createArmyUnits(this.form.value.player1Army)
        this.form.value.player2Army.unitRefs = this.armyService.createArmyUnits(this.form.value.player2Army)

        yourDeployment.firstRow = this.form.value.player1Army.unitRefs.slice(0, 10)
        yourDeployment.secondRow = this.form.value.player1Army.unitRefs.slice(10, 20)

        opponentDeployment.firstRow = this.form.value.player2Army.unitRefs.slice(0, 10)
        opponentDeployment.secondRow = this.form.value.player2Army.unitRefs.slice(10, 20)

        this.store.dispatch({ type: 'updateAppState', payload: { battle: this.form.value } }) 
        this.store.dispatch({ type: 'updateAppState', payload: { deployment: { yourDeployment, opponentDeployment } } }) 
        this.router.navigateByUrl('/battle/arena')
    }

}

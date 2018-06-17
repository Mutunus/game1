import { ArmyService } from './../../services/army.service';
import { IndexDBService } from './../../services/indexDB.service';
import { Army } from './../../classes/army.class'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Unit } from './../../classes/unit.class'
import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import * as uuid from 'uuid/v4'

@Component({
    selector: 'create-army',
    templateUrl: './create-army.template.html',
    styleUrls: ['./create-army.scss']
})

// choose units for battle
export class CreateArmy {

    public units$: Observable<Unit[]>
    public armies$: Observable<Army[]>
    public selectedArmy: Army
    public selectedUnit: Unit
    public selectedUnits: Unit[]
    public form: FormGroup
    public message: string

    constructor(
    private fb: FormBuilder,
    private indexDB: IndexDBService,
    private armyService: ArmyService,
    private store: Store<any>) {
        this.selectedUnits = []
        this.selectedUnit = null
        this.selectedArmy = null
    }

    ngOnInit() {
        this.form = this.createForm()
        this.selectStoreItems()
    }

    createForm(): FormGroup {
        return this.fb.group({
            name: [null, Validators.required],
            description: null
        })
    }

    selectStoreItems() {
        this.units$ = this.store.select(state => state.data.units)
        this.armies$ = this.store.select(state => state.data.armies)
    }

    addUnit() {
        this.selectedUnits.push(this.selectedUnit)
    }

    deleteUnit(i: number) {
        this.selectedUnits.splice(i, 1)
    }

    saveArmy() {
        console.log(this.form, this.selectedUnits)
        let newArmy = Object.assign({}, this.form.value, { armyRef: uuid(), unitRefs: this.selectedUnits.map(unit => unit.unitRef) })
        this.indexDB.post('armies', newArmy)
        this.store.dispatch({ type: 'addArmies', payload: newArmy })        
        this.displayMessage('Army Saved')
        // optionally save to db to share with other players 
        this.resetForm()        
    }

    selectArmy() {
        this.form.patchValue({ name: this.selectedArmy.name, description: this.selectedArmy.description })
        this.selectedUnits = this.armyService.createArmyUnits(this.selectedArmy)
        // this.units$.subscribe((units: Unit[]) => {
        //     this.selectedUnits = this.selectedArmy.unitRefs.map((unitRef: string) => {
        //         return units.find(unit => unit.unitRef === unitRef) || null
        //     })
        //     .filter(unit => unit)
        // }).unsubscribe
        console.log(this.selectedUnits)
    }

    updateArmy() {
        let updatedArmy = Object.assign({}, this.selectedArmy, this.form.value, { unitRefs: this.selectedUnits.map(unit => unit.unitRef) })
        console.log(updatedArmy)
        this.indexDB.put('armies', updatedArmy)
        this.store.dispatch({ type: 'updateArmy', payload: updatedArmy })
        this.resetForm()
    }

    deleteArmy() {
        this.indexDB.delete('armies', this.selectedArmy.armyRef)
        this.store.dispatch({ type: 'deleteArmy', payload: this.selectedArmy })
        this.resetForm()
        this.displayMessage('Army Deleted')        
    }

    resetForm() {
        this.form.reset()
        this.selectedArmy = null
        this.selectedUnit = null
        this.selectedUnits = []
    }

    displayMessage(message: string, duration: number = 4000) {
        this.message = message
        setTimeout(() => this.message = null, duration)
    }

}

import { Observable, from } from 'rxjs';
import { Unit } from './../../classes/unit.class';
import { Store } from '@ngrx/store';
import { IndexDBService } from './../../services/indexDB.service';
import { FormatService } from './../../services/format.service'
import { Component, OnInit, Input } from '@angular/core'
import { FormControl, FormGroup, FormBuilder, Validators, ValidatorFn, FormArray } from '@angular/forms'
import * as uuid from 'uuid/v4'
import { filter } from 'rxjs/operators';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/let'

@Component({
    selector: 'create-unit',
    templateUrl: './create-unit.template.html',
    styleUrls: ['./create-unit.scss']
})

// creating new units. save to db if online. 
export class CreateUnit {

    @Input() maxPoints: any

    public form: FormGroup
    public pointsRemaining: number
    public selectedUnit: Unit
    public units$: Observable <Unit[]>
    public message: string

    constructor(
    private store: Store<any>,
    private fb: FormBuilder,
    private format: FormatService,
    private indexDB: IndexDBService
    ) {

        this.pointsRemaining = this.maxPoints || 1500
        this.units$ = this.store.select(state => state.data.units)
        this.selectedUnit = null
    }

    ngOnInit() {
        this.form = this.createForm()
        this.form.valueChanges.subscribe(formValues => {
            this.pointsRemaining = this.calculateAvailablePoints(formValues, this.maxPoints)
        })
    }

    // add special abilities e.g. bonus flank attack
    // add battle board icon
    createForm(): FormGroup {
        return this.fb.group({
            name: [null, [Validators.required, Validators.maxLength(25)]],
            description: [null, Validators.maxLength(100)],
            strength: [0, [Validators.required, Validators.min(1), Validators.max(1000), this.format.regexValidator(/^[0-9]*$/)]],
            morale: [0, [Validators.required, Validators.min(1), Validators.max(100), this.format.regexValidator(/^[0-9]*$/)]],
            attack: [0, [Validators.required, Validators.min(1), Validators.max(100), this.format.regexValidator(/^[0-9]*$/)]],
            defence: [0, [Validators.required, Validators.min(1), Validators.max(100), this.format.regexValidator(/^[0-9]*$/)]],            
            movement: [1, [Validators.required, Validators.min(1), Validators.max(5), this.format.regexValidator(/^[0-9]*$/)]],   
            unitRef: [null]
        })
    }

    patchFormValues(unit: Unit = new Unit()) {
        this.form.patchValue(unit)
    }

    calculateAvailablePoints({attack, defence, morale, movement, strength}, maxPoints: number = 1500): number {
        return maxPoints - (attack * 8) - (defence * 8) - (morale * 8) - ((movement - 1) * 100) - (strength) 
    }

    displayMessage(message: string, duration: number = 4000) {
        this.message = message
        setTimeout(() => this.message = null, duration)
    }

    saveUnit() {
        let newUnit = (Object.assign({}, this.form.value, { unitRef: uuid() }))
        this.indexDB.post('units', newUnit)
        let unitWithDefaultProps = new Unit(newUnit)
        this.store.dispatch({ type: 'addUnits', payload: [unitWithDefaultProps] })
        this.selectUnit(unitWithDefaultProps)
        this.resetForm()
        // optionally save to db to share with other players 
        this.displayMessage('Unit Saved')
    }

    updateUnit() {
        let updatedUnit = Object.assign({}, this.selectedUnit, this.form.value)
        this.indexDB.put('units', this.form.value)
        this.store.dispatch({ type: 'updateUnit', payload: Object.assign({}, this.selectedUnit, this.form.value) })
        this.resetForm()
        // optionally update in db
        this.displayMessage('Unit Updated')
    }

    deleteUnit() {
        this.indexDB.delete('units', this.selectedUnit.unitRef)
        this.store.dispatch({ type: 'deleteUnit', payload: this.selectedUnit })
        this.resetForm()
        this.displayMessage('Unit Deleted')
    }

    resetForm() {
        this.form.patchValue(new Unit())
        this.selectedUnit = null
    }

    selectUnit(unit: Unit) {
        this.selectedUnit = unit;
        this.form.patchValue(unit)
    }

    filterUnits(search: string, hideDefaults: boolean = false) {
        let units = this.store.select(state => state.data.units.filter((unit: Unit) => unit.name.toLowerCase().includes(search.toLowerCase())))
        if(hideDefaults) {
            units = units.map((units: Unit[]) => units.filter(unit => !unit.default))
        }
        this.units$ = units
    }

}

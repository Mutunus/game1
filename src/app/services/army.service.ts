import { StoreService } from './store.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Army } from './../classes/army.class';
import { Unit } from './../classes/unit.class';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class ArmyService {

    units$: Observable<Unit[]>

    constructor(
    private store: Store<any>,
    private storeService: StoreService
    ) {

        this.units$ = this.store.select(state => state.data.units)
    }

    createArmyUnits(army: Army): Unit[] {
        let units = this.storeService.getItemsReference(this.units$)
        return army.unitRefs.map((unitRef: string) => units
        .find(unit => unit.unitRef === unitRef) || null)
        .filter(unit => unit)
    }

}
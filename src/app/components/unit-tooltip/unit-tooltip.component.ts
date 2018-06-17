import { Unit } from './../../classes/unit.class';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'unit-tooltip',
    templateUrl: './unit-tooltip.template.html',
    styleUrls: ['./unit-tooltip.scss']
})

// need to deploy units before beginning

export class UnitToolTip {

    @Input() unit: Unit

    constructor() {
        
    }
    
}

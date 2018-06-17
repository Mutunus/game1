import { ValidatorFn, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class FormatService {

    constructor() {
        
    }

    regexValidator(regExp: RegExp) : ValidatorFn {
	    return (control: AbstractControl): {[key: string]: any}  => {
		    return regExp.test(control.value) 
            ? null 
            : {regex : {value: control.value}};
        } 
    }

}
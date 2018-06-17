import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class StoreService {

    constructor() {

    }

    getItems(items$: Observable<any>): any { // retrieves a COPY! of items in the store
		let result: any
		items$.subscribe(items => result = items.constructor === Array ? _.cloneDeep(items || []) : _.cloneDeep(items || {}))
		.unsubscribe()
		return result
	}

	getItemsReference(items$: Observable<any>): any { // retrieves a REFERENCE! to items in the store
		let result: any
		items$.subscribe(items => result = items)
		.unsubscribe()
		return result
	}

}
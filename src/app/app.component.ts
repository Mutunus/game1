import { LocalStorageService } from './services/localStorage.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Settings } from './classes/settings.class';
import { IndexDBService } from './services/indexDB.service';
import { InitService } from './services/init.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	settings$: Observable<Settings>

	constructor(
	private store: Store<any>,
	private indexDB: IndexDBService,
	private storageService: LocalStorageService,
	private init: InitService) {
		
		this.settings$ = this.store.select(state => state.data.settings)
	}

	ngOnInit() {
		this.storageService.init()
		this.indexDB.initDB()

		// load config from indexedDB

		this.init.createDefaultUnits()
		this.init.createDefaultArmies()
	}

}

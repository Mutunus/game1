import { Settings } from './../classes/settings.class';
import { DebugService } from './debug.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class LocalStorageService {

    public dbVersion: number

    constructor(
    private debug: DebugService,
    private store: Store<any>) {

    }

    init() {
        const settings = window.localStorage.getItem('settings')
        this.debug.log('got game settings', settings)
        if(!settings) this.updateSettings(new Settings())
        else this.store.dispatch({ type: 'updateAppState', payload: { settings: JSON.parse(settings) } })
    }

    updateSettings(settings: Settings) {
        this.debug.log('updateSettings', settings)
        window.localStorage.setItem('settings', JSON.stringify(settings))
        this.store.dispatch({ type: 'updateAppState', payload: { settings } })
    }

}
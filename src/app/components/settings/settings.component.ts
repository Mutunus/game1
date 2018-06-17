import { LocalStorageService } from './../../services/localStorage.service';
import { StoreService } from './../../services/store.service';
import { Settings } from './../../classes/settings.class';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'settings',
    templateUrl: './settings.template.html',
    styleUrls: ['./settings.scss']
})

export class AppSettings {

    private settings$: Observable<Settings>
    public form: FormGroup
    public message: string

    constructor(
    private fb: FormBuilder,
    private storeService: StoreService,
    private storageService: LocalStorageService,
    private store: Store<any>) {
        
        this.settings$ = this.store.select(state => state.data.settings)
    }

    ngOnInit() {
        this.form = this.createForm(this.storeService.getItems(this.settings$))
    }

    createForm({ musicOn }: Settings): FormGroup {
        return this.fb.group({
            musicOn
        })
    }

    updateSettings() {
        this.storageService.updateSettings(this.form.value)
        this.store.dispatch({ type: 'updateAppState', payload: this.form.value })
    }

}

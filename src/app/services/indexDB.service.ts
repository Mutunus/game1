import { DebugService } from './debug.service';
import { Army } from './../classes/army.class';
import { Unit } from './../classes/unit.class';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class IndexDBService {

    public dbVersion: number

    constructor(
    private debug: DebugService,
    private store: Store<any>) {
        this.dbVersion = 16
    }

    initDB() {
        let db = window.indexedDB.open('gozodDB', this.dbVersion)
        db.onsuccess = this.dbLoaded.bind(this)
        db.onerror = this.dbFailedToOpen
        db.onupgradeneeded = this.buildDB.bind(this)
    }

    dbLoaded(event: any) {
        this.debug.log('indexedDB is loaded')
        const db: IDBDatabase = event.target.result
        console.log('hey', db)        
        this.loadAll('units', (units) => this.store.dispatch({ type: 'addUnits', payload: units.map(unit => new Unit(unit)) }))
        this.loadAll('armies', (armies) => this.store.dispatch({ type: 'addArmies', payload: armies }))
    }

    dbFailedToOpen(event: any) {
        console.error('failed to open indexedDB', event)
    }

    buildDB(event: any) {
        this.debug.log('creating new db', event)
		const db: IDBDatabase = event.target.result
        this.createArmyTable(db)
        this.createUnitsTable(db)
	}

    createArmyTable(db: IDBDatabase) {
        if(db.objectStoreNames.contains('armies')) db.deleteObjectStore('armies')  
        let objectStore = db.createObjectStore('armies', {keyPath: 'armyRef'})
        objectStore.createIndex('armyRef', 'armyRef', { unique: true })
		objectStore.createIndex('name', 'name', { unique: false })
        objectStore.createIndex('description', 'description', { unique: false })
        objectStore.createIndex('unitRefs', 'unitRefs', { unique: false })
    }

    createUnitsTable(db: IDBDatabase) {
        if(db.objectStoreNames.contains('units')) db.deleteObjectStore('units')     
        let objectStore = db.createObjectStore('units', {keyPath: 'unitRef'})
		objectStore.createIndex('unitRef', 'unitRef', { unique: true })        
		objectStore.createIndex('createdBy', 'createdBy', { unique: false })
		objectStore.createIndex('name', 'name', { unique: false })
        objectStore.createIndex('description', 'description', { unique: false })
        objectStore.createIndex('strength', 'strength', { unique: false })
        objectStore.createIndex('attack', 'attack', { unique: false })
        objectStore.createIndex('defence', 'defence', { unique: false })
        objectStore.createIndex('morale', 'morale', { unique: false })
        objectStore.createIndex('movement', 'movement', { unique: false })
    }
    
    loadAll(tableName: string, func: Function) {
        let items = []
        window.indexedDB.open('gozodDB', this.dbVersion)
		.onsuccess = (e: any) => {
			e.target.result.transaction(tableName)
			.objectStore(tableName)
			.openCursor()
			.onsuccess = ((e: any) => {
				const cursor = e.target.result
				if(cursor) {
					items.push(cursor.value)
					cursor.continue()
				}
                else {
                    this.debug.log(`got all from ${tableName}`, items)
                    func(items)
                }
			})
		}
    }

    post(tableName: string, item: any) {
        this.debug.log('adding new item to indexedDB', tableName, item)
        window.indexedDB.open('gozodDB', this.dbVersion)
        .onsuccess = (e: any) => {
            e.target.result.transaction([tableName], 'readwrite')
            .objectStore(tableName)
            .add(item)
        }
    }

    put(tableName: string, item: any) {
        this.debug.log('updating item to indexedDB', tableName, item)        
		window.indexedDB.open('gozodDB', this.dbVersion)
		.onsuccess = (e: any) => {
			e.target.result.transaction(tableName, 'readwrite')
			.objectStore(tableName)
			.put(item)
		}
	}

    delete(tableName: string, itemRef: string) {
        this.debug.log('deleting item from indexedDB', tableName, itemRef)
        window.indexedDB.open('gozodDB', this.dbVersion)
        .onsuccess = (e: any) => {
            e.target.result.transaction(tableName, 'readwrite')
            .objectStore(tableName)
            .delete(itemRef)
        }
    }

}
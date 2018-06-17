import { Army } from './../classes/army.class';
import { Unit } from './../classes/unit.class';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class InitService {

    constructor(private store: Store<any>) {
        
    }

    createDefaultUnits() {
        let units = []
        units.push(new Unit({ name: 'Pawns', description: 'massed peasantry', attack: 30, defence: 35, morale: 35, movement: 1, strength: 700, unitRef: '5f5efdcb-3d91-495c-b69c-9d2a503cb6ff', default: true }))
        units.push(new Unit({ name: 'Skirmishers', description: 'quick light infantry', attack: 50, defence: 42, morale: 30, movement: 2, strength: 424, unitRef: '141423ad-fa9c-4e3f-81a6-ce9a186e5437', default: true }))        
        units.push(new Unit({ name: 'Swordmen', description: 'average infantry', attack: 45, defence: 50, morale: 52, movement: 1, strength: 324, unitRef: 'ce1ea6f4-7a90-4fd5-a050-6ebe87c33fad', default: true }))        
        units.push(new Unit({ name: 'Pikemen', description: 'strong defence', attack: 27, defence: 72, morale: 42, movement: 1, strength: 372, unitRef: '4e73397b-d5b1-4d89-b9d1-8b991d710870', default: true }))
        units.push(new Unit({ name: 'Knights', description: 'quick', attack: 55, defence: 30, morale: 50, movement: 3, strength: 220, unitRef: '33d3e140-e614-44cf-b705-2ee53c9d6cf5', default: true }))
        units.push(new Unit({ name: 'Cataphract', description: 'heavy cavalry', attack: 60, defence: 45, morale: 55, movement: 2, strength: 120, unitRef: '14455267-ad03-44f7-b301-da76ed36cb44', default: true }))
        units.push(new Unit({ name: 'Beserkers', description: 'good shock troops, but poor defence', attack: 70, defence: 20, morale: 57, movement: 1, strength: 324, unitRef: '315b008a-239f-4556-885e-2792e1ee3211', default: true }))
        units.push(new Unit({ name: 'Goblins', description: 'nimble swarm of very light infantry', attack: 17, defence: 13, morale: 20, movement: 2, strength: 1000, unitRef: 'ea7d1313-4716-4d61-829f-daef3e085b42', default: true }))
        units.push(new Unit({ name: 'Ogres', description: 'small group of powerful infantry', attack: 60, defence: 60, morale: 55, movement: 1, strength: 100, unitRef: '2981166f-5e10-4579-b3d5-7fd9e4e22b8b', default: true }))
        units.push(new Unit({ name: 'Wargs', description: 'very fast shock troops, but with poor morale and very poor defence', attack: 70, defence: 15, morale: 27, movement: 4, strength: 304, unitRef: '1a30a7b2-55bd-4715-ab33-3d318ee4761e', default: true }))
        units.push(new Unit({ name: 'Undead', description: 'weak infantry with near unbreakable morale', attack: 20, defence: 20, morale: 78, movement: 1, strength: 556, unitRef: '5f338a92-c276-4a0c-8361-a4afd3a381ca', default: true }))
        units.push(new Unit({ name: 'Trolls', description: 'powerful offensive infantry, but with poor defence and morale', attack: 78, defence: 32, morale: 34, movement: 1, strength: 348, unitRef: 'a7f8856a-5fc6-11e8-9c2d-fa7ae01bbebc', default: true }))
        this.store.dispatch({ type: 'updateAppState', payload: { units } })

    }

    createDefaultArmies() {
        let armies = []
        armies.push(new Army({ 
            name: 'Evil Army',
            description: 'Some real bad dudes',
            armyRef: '8a35agh9-55bd-4715-pp44-3d318ee5671e',
            default: true,
            unitRefs: [
                'ea7d1313-4716-4d61-829f-daef3e085b42',
                'ea7d1313-4716-4d61-829f-daef3e085b42',
                'ea7d1313-4716-4d61-829f-daef3e085b42',
                'ea7d1313-4716-4d61-829f-daef3e085b42',
                'ea7d1313-4716-4d61-829f-daef3e085b42',
                'ea7d1313-4716-4d61-829f-daef3e085b42',
                '141423ad-fa9c-4e3f-81a6-ce9a186e5437',
                '141423ad-fa9c-4e3f-81a6-ce9a186e5437',
                '2981166f-5e10-4579-b3d5-7fd9e4e22b8b',
                '2981166f-5e10-4579-b3d5-7fd9e4e22b8b',
                '2981166f-5e10-4579-b3d5-7fd9e4e22b8b',
                '2981166f-5e10-4579-b3d5-7fd9e4e22b8b',
                '5f338a92-c276-4a0c-8361-a4afd3a381ca',
                '5f338a92-c276-4a0c-8361-a4afd3a381ca',
                '5f338a92-c276-4a0c-8361-a4afd3a381ca',
                '5f338a92-c276-4a0c-8361-a4afd3a381ca',
                '1a30a7b2-55bd-4715-ab33-3d318ee4761e',
                '1a30a7b2-55bd-4715-ab33-3d318ee4761e',
                'a7f8856a-5fc6-11e8-9c2d-fa7ae01bbebc',
                'a7f8856a-5fc6-11e8-9c2d-fa7ae01bbebc'
            ]

        }))
        armies.push(new Army({ 
            name: 'Good Army',
            description: 'Some real nice dudes',
            armyRef: '28226306-5fc6-11e8-9c2d-fa7ae01bbebc',
            default: true,
            unitRefs: [
                '5f5efdcb-3d91-495c-b69c-9d2a503cb6ff',
                '5f5efdcb-3d91-495c-b69c-9d2a503cb6ff',
                '5f5efdcb-3d91-495c-b69c-9d2a503cb6ff',
                '5f5efdcb-3d91-495c-b69c-9d2a503cb6ff',
                '5f5efdcb-3d91-495c-b69c-9d2a503cb6ff',
                '5f5efdcb-3d91-495c-b69c-9d2a503cb6ff',
                '5f5efdcb-3d91-495c-b69c-9d2a503cb6ff',
                '5f5efdcb-3d91-495c-b69c-9d2a503cb6ff',
                'ce1ea6f4-7a90-4fd5-a050-6ebe87c33fad',
                'ce1ea6f4-7a90-4fd5-a050-6ebe87c33fad',
                '33d3e140-e614-44cf-b705-2ee53c9d6cf5',
                '33d3e140-e614-44cf-b705-2ee53c9d6cf5',
                '33d3e140-e614-44cf-b705-2ee53c9d6cf5',
                '33d3e140-e614-44cf-b705-2ee53c9d6cf5',
                '14455267-ad03-44f7-b301-da76ed36cb44',
                '14455267-ad03-44f7-b301-da76ed36cb44',
                '4e73397b-d5b1-4d89-b9d1-8b991d710870',
                '4e73397b-d5b1-4d89-b9d1-8b991d710870',
                '4e73397b-d5b1-4d89-b9d1-8b991d710870',
                '4e73397b-d5b1-4d89-b9d1-8b991d710870'
            ]
        }))
        this.store.dispatch({ type: 'updateAppState', payload: { armies } })
    }

}
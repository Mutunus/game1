import { AppState } from './../classes/appState.class'
import { myAction } from './../interfaces/action.interface';
import * as _ from 'lodash';

export function data(state: AppState = new AppState(), action: myAction) {
	switch (action.type) {

    case 'updateAppState':
		//console.log('update app state', action.payload)
        return Object.assign(state, action.payload)

	case 'addUnits':
		state.units = [...state.units, ...action.payload]
		return state

	case 'deleteUnit': 
		state.units = state.units.filter(unit => unit.unitRef != action.payload.unitRef)
		return state

	case 'updateUnit':
		let units = state.units.map(unit => unit.unitRef != action.payload.unitRef ? unit : Object.assign({}, unit, action.payload))
		return Object.assign(state, { units })

	case 'addArmies':
		state.armies = [...state.armies, ...action.payload]
		return state

	case 'deleteArmy': 
		state.armies = state.armies.filter(army => army.armyRef != action.payload.armyRef)
		return state

	case 'updateArmy':
		let armies = state.armies.map(army => army.armyRef != action.payload.armyRef ? army : Object.assign({}, army, action.payload))
		return Object.assign(state, { armies })

	default:
		return state;
	}

}
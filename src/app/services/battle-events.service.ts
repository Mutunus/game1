import { Unit } from './../classes/unit.class';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class BattleEventsService {

    constructor() {
        
    }

    getNumberOfAttacks(attackerStrength: number): number {
        if(attackerStrength < 120) return Math.round(attackerStrength / 1.5)
        else if(attackerStrength > 120 && attackerStrength < 240) return Math.round(attackerStrength / 4)
        else if(attackerStrength > 240 && attackerStrength < 480) return Math.round(attackerStrength / 5)
        else if(attackerStrength > 480 && attackerStrength < 600) return Math.round(attackerStrength / 6)
        else if(attackerStrength > 600 && attackerStrength < 800) return Math.round(attackerStrength / 7)
        else return Math.round(attackerStrength / 8)
    }

    resolveCombat(attacker: Unit, defender: Unit): CombatResults {
        console.log(defender, attacker)
        let combatResults = new CombatResults()
        let attacks = this.getNumberOfAttacks(attacker.currentStrength)
        let defence = defender.defence
        let attackStartStrength = attacker.currentStrength
        let defenderStartStrength = defender.currentStrength
        if(defender.situation === 'flanked') {
            attacks *= 2
            defence / 2
        } 
        for(attacks; attacks > 0; attacks--) {
            
            let attackResult = this.attack(defence, attacker.attack)

            let attackSuccessChance = `${(100 - ((attackResult / 50) * 100)).toFixed(2)}% chance to succeed`
            if((Math.random() * 50) > attackResult) {
                combatResults.events.push(`attack success: ${attackSuccessChance}`)
                defender.currentStrength -= 1
            } 
            else {
                combatResults.events.push(`attack failed: ${attackSuccessChance}`)
                let counterAttackResult = this.attack(attacker.defence, defender.attack)
                let counterAttackSuccessChance = `${(100 - ((counterAttackResult / 60) * 100)).toFixed(2)}% chance to succeed`
                console.log(counterAttackResult)
                if((Math.random() * 60) > counterAttackResult) {
                    combatResults.events.push(`counterattack success: ${counterAttackSuccessChance}`)
                    attacker.currentStrength -= 1
                }
                else {
                    combatResults.events.push(`counterattack failed: ${counterAttackSuccessChance}`, 'combat unresolved')
                }
            }
            //debugger
        }

        combatResults.result = {
            attacker,
            defender,
            attackerLost: attackStartStrength - attacker.currentStrength,
            defenderLost: defenderStartStrength - defender.currentStrength,
            attackerPercentLost: this.percentLost(attackStartStrength, attacker.currentStrength),
            defenderPercentLost: this.percentLost(defenderStartStrength, defender.currentStrength)
        }
        console.log(combatResults)
        debugger
        return combatResults

        //morale()

        // if unit strength is greater than 120 then use 1/2 strength of attacker (only half are actually engaged in combat)
        // for each strength point determine combat result against a defender strength point
        // combat result can be win, lose, draw
        // combat result is influenced by sitation of unit e.g. if flanked
        // morale is gained if attacker or defender wins combat
        // morale is lost if attacker or defender loses combat

        // if defender or attacker is defeated then remove them from units array

    }

    percentLost(startStrength: number, currentStrength: number): string {
        return (((startStrength - currentStrength) / startStrength) * 100).toFixed(2)
    }

    morale() {
        // if defender or attacker lost > 20% then hit to morale

        // run morale check if attacker or defender lost combat
    }


    attack(defence: number, attack: number): number {
        let res = ((150 + ((defence - attack) * 3)) * Math.random())
        return res
    }
    
}

export class CombatResults {

    events: string[]
    result: any

    constructor() {

        this.events = []
        this.result = {}

    }
}
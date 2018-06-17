import { Injectable, isDevMode } from '@angular/core';

@Injectable()
export class DebugService {

    log(...x) {
        if(isDevMode()) {
            console.log('debug:', ...x)
        }
    }
 
 }
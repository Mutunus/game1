export class Settings {

    musicOn?: boolean

    constructor(params: Settings = {}) {
        
        this.musicOn = params.musicOn || true
    }
}
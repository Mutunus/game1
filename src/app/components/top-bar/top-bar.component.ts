import { Component, Input } from '@angular/core'

@Component({
    selector: 'top-bar',
    templateUrl: './top-bar.template.html',
    styleUrls: ['./top-bar.scss']
})

export class TopBar {

    @Input('title') title: string;
    @Input('message') message: string;

    constructor() {

    }


}

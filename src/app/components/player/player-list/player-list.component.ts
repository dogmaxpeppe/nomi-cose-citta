import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../player';

@Component({
    selector: 'app-player-list',
    templateUrl: './player-list.component.html',
    styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit {
    @Input() players: Array<Player>;

    constructor() {
    }

    ngOnInit() {
    }

}

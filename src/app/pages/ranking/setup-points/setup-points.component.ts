import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../../services/shared.service';
import { NavParams } from '@ionic/angular';

@Component({
    selector: 'app-setup-points',
    templateUrl: './setup-points.component.html',
    styleUrls: ['./setup-points.component.scss'],
})
export class SetupPointsComponent {

    @Input() players: Array<Player>;
    @Input() points: Array<any>;
    playerPointsForm: FormGroup;
    constructor(
        private sharedService: SharedService,
        navParams: NavParams
    ) {
        this.players = navParams.get('players');
        this.points = navParams.get('points');
        const controls = {};

        for ( let player of this.players ) {
            const points = typeof this.points[`player-${player.id}`] !== "undefined" ? this.points[`player-${player.id}`] : 0;
            controls[`player-${player.id}`] = new FormControl(points, Validators.required);
        }

        this.playerPointsForm = new FormGroup(controls);
    }

    onSubmit() {
        if ( this.playerPointsForm.valid ) {
            const data = {};
            Object.keys(this.playerPointsForm.controls).map(key => {
                data[key] = this.playerPointsForm.get(key).value;
            });

            this.sharedService.emitUpdatePointsFun(data);
        }
    }
}

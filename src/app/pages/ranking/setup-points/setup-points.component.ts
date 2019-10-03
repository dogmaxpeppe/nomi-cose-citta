import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../../services/shared.service';
import { NavParams } from '@ionic/angular';

@Component({
    selector: 'app-setup-points',
    templateUrl: './setup-points.component.html',
    styleUrls: ['./setup-points.component.scss'],
})
export class SetupPointsComponent implements OnInit {

    @Input() players: Array<Player>;
    playerPointsForm: FormGroup;
    constructor(
        private sharedService: SharedService,
        navParams: NavParams
    ) {
        this.players = navParams.get('players');
        const controls = {};

        for ( let player of this.players )
            controls[`player-${player.id}`] = new FormControl(0, Validators.required);

        this.playerPointsForm = new FormGroup(controls);
    }

    ngOnInit() {}

    onSubmit() {
        if ( this.playerPointsForm.valid ) {
            const data = {};
            Object.keys(this.playerPointsForm.controls).map(key => {
                data[key] = this.playerPointsForm.get(key).value;
            });
            console.log(data);

            this.sharedService.emitChange(data);
        }
    }
}

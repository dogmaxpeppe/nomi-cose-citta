import { Component, Input } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { SharedService } from '../../../services/shared.service';
import { ModalController, NavParams } from '@ionic/angular';
import { Player } from '../../../components/player/player';

@Component({
    selector: 'app-setup-points',
    templateUrl: './setup-points.component.html',
    styleUrls: ['./setup-points.component.scss'],
})
export class SetupPointsComponent {

    @Input() players: Array<Player>;
    @Input() points: Array<any>;
    playerPointsForm: UntypedFormGroup;
    constructor(
        private sharedService: SharedService,
        private modalController: ModalController,
        navParams: NavParams
    ) {
        this.players = navParams.get('players');
        this.points = navParams.get('points');
        const controls = {};

        for ( let player of this.players ) {
            const points = typeof this.points[`player-${player.id}`] !== "undefined" ? this.points[`player-${player.id}`] : 0;
            controls[`player-${player.id}`] = new UntypedFormControl(points, Validators.required);
        }

        this.playerPointsForm = new UntypedFormGroup(controls);
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

    dismiss() {
        this.modalController.dismiss();
    }
}

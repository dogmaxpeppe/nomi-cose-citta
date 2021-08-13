import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { avatars } from '../avatar/Avatars';
import { SharedService } from '../../../services/shared.service';
import { Player } from '../player';
import { Store, select } from '@ngrx/store';
import { addPlayer } from '../../../state/actions';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-player-form',
    templateUrl: './player-form.component.html',
    styleUrls: ['./player-form.component.scss'],
})
export class PlayerFormComponent implements OnInit {
    @Input() private player: Player = null;
    public editMode: boolean = false;
    public playerForm: FormGroup;

    avatars = avatars;

    constructor(
        private sharedService: SharedService,
        private modalController: ModalController
    ) {

    }

    ngOnInit() {
        this.editMode = this.player !== null;

        this.playerForm = new FormGroup({
            id: new FormControl(this.player?.id),
            name: new FormControl(this.player?.name, Validators.required),
            avatar: new FormControl(this.player?.avatar, Validators.required),
            points: new FormControl(this.player?.points),
        });
    }

    onSubmit() {
        if ( this.playerForm.valid ) {
            const newPlayer: Player = {
                id: this.playerForm.get('id').value,
                name: this.playerForm.get('name').value,
                avatar: this.playerForm.get('avatar').value,
                points: this.playerForm.get('points').value,
            };

            if (!newPlayer.id) {
                this.sharedService.emitAddPlayerFun(newPlayer);
            } else {
                this.sharedService.emitEditPlayerFun(newPlayer);
            }
        }
    }

    selectAvatar(id) {
        this.playerForm.get('avatar').setValue(id);
    }

    dismiss() {
        this.modalController.dismiss();
    }
}

import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { avatars } from '../avatar/Avatars';
import { SharedService } from '../../../services/shared.service';
import { Player } from '../player';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-player-form',
    templateUrl: './player-form.component.html',
    styleUrls: ['./player-form.component.scss'],
})
export class PlayerFormComponent implements OnInit {
    @Input() private player: Player = null;
    public editMode: boolean = false;
    public playerForm: UntypedFormGroup;

    avatars = avatars;
    selectedAvatar: number;

    constructor(
        private sharedService: SharedService,
        private modalController: ModalController
    ) {

    }

    ngOnInit() {
        this.editMode = this.player !== null;

        this.playerForm = new UntypedFormGroup({
            id: new UntypedFormControl(this.player?.id),
            name: new UntypedFormControl(this.player?.name, Validators.required),
            avatar: new UntypedFormControl(this.player?.avatar, Validators.required),
            points: new UntypedFormControl(this.player?.points),
        });

        this.selectedAvatar = this.player?.avatar;
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

    selectAvatar(id: number) {
        this.playerForm.get('avatar').setValue(id);
        this.selectedAvatar = id;
    }

    dismiss() {
        this.modalController.dismiss();
    }
}

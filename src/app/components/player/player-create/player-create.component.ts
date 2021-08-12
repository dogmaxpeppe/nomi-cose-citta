import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { avatars } from '../avatar/Avatars';
import { SharedService } from '../../../services/shared.service';
import { Player } from '../player';

@Component({
    selector: 'app-player-create',
    templateUrl: './player-create.component.html',
    styleUrls: ['./player-create.component.scss'],
})
export class PlayerCreateComponent implements OnInit {

    playerForm = new FormGroup({
        name: new FormControl('', Validators.required),
        avatar: new FormControl('', Validators.required)
    });

    avatars = avatars;

    constructor(private sharedService: SharedService) { }

    ngOnInit() {}

    onSubmit() {
        if ( this.playerForm.valid ) {
            const newPlayer: Player = {
                id: null,
                name: this.playerForm.get('name').value,
                avatar: this.playerForm.get('avatar').value,
                points: null,
            };

            this.sharedService.emitAddPlayerFun(newPlayer);
        }
    }

    selectAvatar(id) {
        this.playerForm.get('avatar').setValue(id);
    }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { avatars } from '../avatar/Avatars';
import { SharedService } from '../../../services/shared.service';

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
            this.sharedService.emitChange({
                name: this.playerForm.get('name').value,
                avatar: this.playerForm.get('avatar').value,
            });
        }
    }

    selectAvatar(id) {
        document.getElementById(`avatar-${id}`).classList.add('selected');
        document.querySelectorAll('.selected').forEach((element) => {
            if ( element.classList.contains('selected') && element.id !== `avatar-${id}` ) {
                element.classList.remove('selected');
                return false;
            }
        });
        this.playerForm.get('avatar').setValue(id);
    }
}
import { Component, Input, OnInit } from '@angular/core';
import { avatars } from './Avatars';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {

    @Input() avatar: any;
    @Input() idAvatar: number;
    @Input() selected = false;

    constructor() {
    }

    ngOnInit() {
        if (!this.avatar && this.idAvatar) {
            this.avatar = avatars.filter(avatar => avatar.id == this.idAvatar)[0];
        }
    }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar/avatar.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerFormComponent } from './player-form/player-form.component';
import { PlayerComponent } from './player/player.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AvatarComponent, PlayerListComponent, PlayerFormComponent, PlayerComponent],
    imports: [
        CommonModule,
        IonicModule,
        ReactiveFormsModule,
    ],
    exports: [
        AvatarComponent,
        PlayerListComponent,
        PlayerFormComponent,
        PlayerComponent
    ]
})
export class PlayerModule { }

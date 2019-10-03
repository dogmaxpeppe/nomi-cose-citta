import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar/avatar.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerCreateComponent } from './player-create/player-create.component';
import { PlayerComponent } from './player/player.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [AvatarComponent, PlayerListComponent, PlayerCreateComponent, PlayerComponent],
    imports: [
        CommonModule,
        IonicModule,
        ReactiveFormsModule,
    ],
    exports: [
        AvatarComponent,
        PlayerListComponent,
        PlayerCreateComponent,
        PlayerComponent
    ]
})
export class PlayerModule { }

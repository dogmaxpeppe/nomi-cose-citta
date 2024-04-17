import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar/avatar.component';
import { PlayerListComponent } from './player-list/player-list.component';
import { PlayerFormComponent } from './player-form/player-form.component';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations: [AvatarComponent, PlayerListComponent, PlayerFormComponent,],
    imports: [
        CommonModule,
        IonicModule,
        ReactiveFormsModule,
        TranslateModule,
    ],
    exports: [
        AvatarComponent,
        PlayerListComponent,
        PlayerFormComponent,
    ]
})
export class PlayerModule {
}

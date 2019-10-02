import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { AvatarComponent } from '../../components/player/avatar/avatar.component';
import { PlayerComponent } from '../../components/player/player/player.component';
import { PlayerCreateComponent } from '../../components/player/player-create/player-create.component';
import { PlayerListComponent } from '../../components/player/player-list/player-list.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage
            }
        ]),
        ReactiveFormsModule
    ],
    declarations: [HomePage, AvatarComponent, PlayerComponent, PlayerCreateComponent, PlayerListComponent],
    entryComponents: [PlayerCreateComponent],
})
export class HomePageModule {}

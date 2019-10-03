import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { PlayerCreateComponent } from '../../components/player/player-create/player-create.component';

import { PlayerModule } from '../../components/player/player.module';
import { StoreModule } from '@ngrx/store';

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
        ReactiveFormsModule,
        PlayerModule,
    ],
    declarations: [HomePage],
    entryComponents: [PlayerCreateComponent],
})
export class HomePageModule {}

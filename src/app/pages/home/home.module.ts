import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { PlayerFormComponent } from '../../components/player/player-form/player-form.component';

import { PlayerModule } from '../../components/player/player.module';
import { TranslateModule } from "@ngx-translate/core";

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
        TranslateModule,
    ],
    declarations: [HomePage]
})
export class HomePageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RankingPage } from './ranking.page';

// REDUX
import { StoreModule } from '@ngrx/store';
import reducer from '../../../reducer';
import { Actions } from '../../../actions';
import { PlayerModule } from '../../components/player/player.module';
import { SetupPointsComponent } from './setup-points/setup-points.component';

const routes: Routes = [
    {
        path: '',
        component: RankingPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        StoreModule.forRoot({players: reducer}),
        PlayerModule,
        ReactiveFormsModule
    ],
    providers: [
        Actions
    ],
    declarations: [RankingPage, SetupPointsComponent],
    entryComponents: [SetupPointsComponent]
})
export class RankingPageModule {}

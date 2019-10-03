import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducer';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SetupPointsComponent } from './setup-points/setup-points.component';

@Component({
    selector: 'app-ranking',
    templateUrl: './ranking.page.html',
    styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {

    public playerList: Array<Player> = [];
    public setupPointsMode: boolean = true;
    public gameEnded: boolean = false;

    constructor(
        private appStore: Store<AppState>,
        private router: Router,
        private modalController: ModalController
    )
    {
        this.appStore.select('players').subscribe(state => {
            console.log(state);
            this.playerList = state['players'];

            // Ordina per punteggio
            this.playerList.sort((a, b) => {
                if ( a.points < b.points ) return 1;
                else if ( a.points > b.points ) return -1;
                return 0;
            })
        });
    }

    ngOnInit() {
        console.log(this.router.getCurrentNavigation());
        if ( this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.setupPoints ) {
            this.setupPointsMode = true;
            this.setupPoints();
        }
    }

    private async setupPoints() {
        const modal = await this.modalController.create({
            component: SetupPointsComponent,
            componentProps: {
                players: this.playerList
            }
        });

        await modal.present();
    }

    nextRound() {
        this.router.navigate(['/start'])
    }

    endGame() {

    }
}

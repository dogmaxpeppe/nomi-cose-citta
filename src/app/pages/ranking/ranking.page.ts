import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SetupPointsComponent } from './setup-points/setup-points.component';
import { SharedService } from '../../services/shared.service';

import { Player } from '../../components/player/player';
import { selectPlayers } from '../../state/selectors';
import { updatePoints } from '../../state/actions';

@Component({
    selector: 'app-ranking',
    templateUrl: './ranking.page.html',
    styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit {

    public playerList: Array<Player> = [];
    public playerListSorted: Array<Player> = [];
    public pointsToUpdate: Array<any> = [];
    public setupPointsMode: boolean = true;
    public gameEnded: boolean = false;

    constructor(
        private appStore: Store,
        private router: Router,
        private modalController: ModalController,
        private sharedService: SharedService,
    ) {
        this.appStore.pipe(select(selectPlayers)).subscribe(players => {
            this.playerList = players;

            this.sortPlayersByPoints(this.playerList);
        });

        sharedService.updatePoints$.subscribe(points => {
            // this.appStore.dispatch(this.actions.updatePoints(points));
            // Salva i punti attuali
            this.pointsToUpdate = points;

            // Aggiorna SOLO quelli della lista attualmente caricata dal componente.
            // Solo al prossimo round salvi nello stato
            this.updatePointsTemp();

            this.modalController.dismiss({
                dismissed: true,
            });
        });
    }

    ngOnInit() {
        // console.log(this.router.getCurrentNavigation());
        if (this.router.getCurrentNavigation().extras.state && this.router.getCurrentNavigation().extras.state.setupPoints) {
            this.setupPointsMode = true;
            this.setupPoints();
        }
    }

    private async setupPoints() {
        const modal = await this.modalController.create({
            component: SetupPointsComponent,
            componentProps: {
                players: this.playerList,
                points: this.pointsToUpdate,
            }
        });

        await modal.present();
    }

    private updatePointsTemp() {
        const playerListUpdated = JSON.parse(JSON.stringify(this.playerList));

        playerListUpdated.map((player) => {
            player.points += typeof this.pointsToUpdate[`player-${player.id}`] !== 'undefined' ?
                this.pointsToUpdate[`player-${player.id}`] : 0;
        });

        this.sortPlayersByPoints(playerListUpdated);
    }

    private sortPlayersByPoints(playerList) {
        this.playerListSorted = [...playerList];

        // Ordina per punteggio
        this.playerListSorted.sort((a, b) => {
            if (a.points < b.points) {
                return 1;
            } else if (a.points > b.points) {
                return -1;
            }
            return 0;
        });
    }

    nextRound() {
        this.appStore.dispatch(updatePoints({points: this.pointsToUpdate}));
        this.router.navigate(['/start'], {state: {resetState: true}});
    }

    endGame() {

    }
}

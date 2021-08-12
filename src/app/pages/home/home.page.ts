import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PlayerCreateComponent } from '../../components/player/player-create/player-create.component';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Player } from '../../components/player/player';
import { addPlayer } from '../../state/actions';
import { selectPlayers } from '../../state/selectors';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    playerList: Array<Player> = [];

    constructor(
        private modalController: ModalController,
        private sharedService: SharedService,
        private router: Router,
        private appStore: Store
    ) {
        this.appStore.pipe(select(selectPlayers)).subscribe(players => {
            this.playerList = players;
        });

        sharedService.addPlayer$.subscribe(playerData => {
            this.appStore.dispatch(addPlayer({player: playerData}));
            this.modalController.dismiss({
                dismissed: true,
            });
        });
    }

    createPlayer() {
        this.presentModal();
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: PlayerCreateComponent
        });
        return await modal.present();
    }

    startGame() {
        if (this.playerList.length) {
            this.router.navigate(['/start']);
        }
    }

}

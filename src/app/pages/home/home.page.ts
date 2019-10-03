import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PlayerCreateComponent } from '../../components/player/player-create/player-create.component';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { Actions } from '../../../actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../../reducer';

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
        private actions: Actions,
        private appStore: Store<AppState>
    ) {
        this.appStore.select('players').subscribe(state => {
            this.playerList = state['players'];
        });

        sharedService.changeEmitted$.subscribe(playerData => {
            this.appStore.dispatch(this.actions.addPlayer(playerData));
            this.modalController.dismiss({
                dismissed: true,
            })
        })
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
        if ( this.playerList.length )
            this.router.navigate(['/start']);
    }

}

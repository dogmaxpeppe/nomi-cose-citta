import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { PlayerFormComponent } from '../../components/player/player-form/player-form.component';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Player } from '../../components/player/player';
import { addPlayer } from '../../state/actions';
import { selectPlayers } from '../../state/selectors';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    playerList: Array<Player> = [];
    private addPlayer$: Subscription;


    constructor(
        private modalController: ModalController,
        private sharedService: SharedService,
        private router: Router,
        private appStore: Store,
        private shared: SharedService,
        private alertController: AlertController
    ) {
        this.appStore.pipe(select(selectPlayers)).subscribe(players => {
            this.playerList = players;
        });
    }

    ionViewWillEnter() {
        // Attiva subscriver per catturare l'evento di aggiunta dalla modale
        this.addPlayer$ = this.sharedService.addPlayer$.subscribe(playerData => {
            this.appStore.dispatch(addPlayer({player: playerData}));
            this.modalController.dismiss({
                dismissed: true,
            });
        });
    }

    ionViewWillLeave() {
        // Fix per evitare che, passando al settings, ripeta più volte il subscribe ad addPlayer.
        this.addPlayer$.unsubscribe();
    }

    createPlayer() {
        this.presentModal();
    }

    async presentModal() {
        const modal = await this.modalController.create({
            component: PlayerFormComponent
        });
        return await modal.present();
    }

    startGame() {
        if (this.playerList.length) {
            // Disabilita il back button
            this.shared.disableBackButton();

            this.router.navigate(['/start']);
        }
    }

    openOptions() {
        this.router.navigate(['/settings']);
    }

    async closeApp() {
        const alert = await this.alertController.create({
            message: `Sei sicuro di voler chiudere l'app?`,
            buttons: [{
                text: 'Sì', handler: () => {
                    navigator['app'].exitApp();
                }
            }, 'No']
        });

        await alert.present();
    }
}

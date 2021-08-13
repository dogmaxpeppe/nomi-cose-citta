import { Component, Input, OnInit } from '@angular/core';
import { Player } from '../player';
import { SharedService } from '../../../services/shared.service';
import { PlayerFormComponent } from '../player-form/player-form.component';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { select, Store } from '@ngrx/store';
import { getPlayer } from '../../../state/selectors';
import { addPlayer, deletePlayer } from '../../../state/actions';

@Component({
    selector: 'app-player-list',
    templateUrl: './player-list.component.html',
    styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit {
    @Input() players: Array<Player>;

    // Se è true, mostra al lato del giocatore delle medaglie
    @Input() showMedals: boolean = false;

    constructor(
        private sharedService: SharedService,
        private modalController: ModalController,
        private appStore: Store,
        private alertController: AlertController,
        private toastController: ToastController
    ) {
        this.sharedService.editPlayer$.subscribe(playerData => {
            this.appStore.dispatch(addPlayer({player: playerData}));
            this.modalController.dismiss({
                dismissed: true,
            });
        });
    }

    ngOnInit() {

    }

    editPlayer(player: Player) {
        const obs = this.appStore.pipe(select(getPlayer(player.id))).subscribe(player => {
            this.presentModal(player).then(() => obs.unsubscribe());
        });
    }

    deletePlayer(player: Player) {
        this.presentAlert(player, async () => {
           this.appStore.dispatch(deletePlayer({player}));
            const toast = await this.toastController.create({
                message: "L'utente è stato cancellato correttamente",
                duration: 2000
            });

            await toast.present();
        });
    }

    async presentModal(player: Player) {
        const modal = await this.modalController.create({
            component: PlayerFormComponent,
            componentProps: {
                player
            }
        });
        return await modal.present();
    }

    async presentAlert(player: Player, confirmHandler) {
        const alert = await this.alertController.create({
            header: `Cancellare ${player.name}?`,
            message: `Sei sicuro di voler cancellare l'utente selezionato?`,
            buttons: [{text: 'Sì', handler: confirmHandler}, 'No']
        });

        await alert.present();
    }
}

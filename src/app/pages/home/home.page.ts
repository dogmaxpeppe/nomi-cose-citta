import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PlayerCreateComponent } from '../../components/player/player-create/player-create.component';
import { SharedService } from '../../services/shared.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    playerList: Array<any> = [];

    constructor(
        private modalController: ModalController,
        private sharedService: SharedService
    ) {
        sharedService.changeEmitted$.subscribe(ev => {
            this.playerList.push(ev);
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
        console.log('START!');
    }

}

import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { PlayerFormComponent } from '../../components/player/player-form/player-form.component';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Player } from '../../components/player/player';
import { addPlayer, newGame } from '../../state/actions';
import { selectPlayers } from '../../state/selectors';
import { Subscription } from 'rxjs';
import { Game } from "../../state/state";
import { SettingsService } from "../../services/settings.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
    playerList: Array<Player> = [];
    private addPlayer$: Subscription;


    constructor(
        private modalController: ModalController,
        private sharedService: SharedService,
        private router: Router,
        private appStore: Store,
        private shared: SharedService,
        private alertController: AlertController,
        private settings: SettingsService,
        private trans: TranslateService,
    ) {
        this.appStore.pipe(select(selectPlayers)).subscribe(players => {
            this.playerList = players;
        });

        this.trans.use(this.settings.getCurrentLanguage() ?? 'it');
    }

    async ngOnInit() {
        // Prova a vedere se c'è una partita in corso
        const matches = await this.settings.getMatchesInfo();

        if (matches) {
            const currentGame = matches.find(game => game.currentGame);

            if (currentGame) {
                await this.openRunningGame(currentGame);
            }
        }
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

    startGame(loadedGame: Game = null) {
        if (this.playerList.length) {
            // Disabilita il back button
            this.shared.disableBackButton();

            if (!loadedGame) {
                this.settings.saveCurrentGame();
            } else {
                this.appStore.dispatch(newGame({ resumedGame: loadedGame }));
            }

            this.router.navigate(['/start']);
        }
    }

    openOptions() {
        this.router.navigate(['/settings']);
    }

    async closeApp() {
        const alert = await this.alertController.create({
            message: this.trans.instant('SURE_CLOSE_APP'),
            buttons: [{
                text: this.trans.instant('YES'), handler: () => {
                    navigator['app'].exitApp();
                }
            }, this.trans.instant('NO')]
        });

        await alert.present();
    }

    async openRunningGame(game: Game) {
        // Fix: a questo punto del codice può capitare che non sia stato ancora settato il linguaggio
        // nel TranslationService. In tal caso, forzalo.
        this.trans.use(this.settings.getCurrentLanguage() ?? 'it');
        const alert = await this.alertController.create({
            message: this.trans.instant('GAME_FOUND'),
            buttons: [{
                text: this.trans.instant('YES'), handler: () => {
                    this.playerList = game.players;
                    this.startGame(game);
                }
            }, {
                text: this.trans.instant('NO'), handler: () => {
                    // Non è più un game da riprendere, quindi metti la variabile a false.
                    game.currentGame = false;
                    this.settings.setMatchInfo(game);
                }
            }]
        });

        await alert.present();
    }
}

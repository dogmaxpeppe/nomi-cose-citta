import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { ToastController } from '@ionic/angular';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

    private settingsArray: Array<any> = [];

    constructor(
        public settings: SettingsService,
        private toastController: ToastController
    ) {
    }

    async ngOnInit() {
        this.settingsArray = await this.settings.getAll();
    }

    getProp(key: string) {
        return this.settingsArray[key] ?? null;
    }

    changeProp(ev: any) {
        // Intercept Prop ID
        const evID = ev.target.id;

        // Exec Function based on ID
        switch (evID) {
            case 'themeToggle':
                this.themeToggle(ev.detail.checked);
                break;
            case 'countdownSeconds':
                this.countdownSeconds(+ev.detail.value, ev.target.min, ev.target.max);
                break;
        }
    }

    private themeToggle(checked) {
        this.settings.set(this.settings.DARK_THEME_ENABLED, checked);
    }

    private async countdownSeconds(seconds: number, min: number, max: number) {
        if (seconds >= min && seconds <= max) {
            this.settings.set(this.settings.COUNTDOWN_SECONDS, seconds);
        } else {
            const toast = await this.toastController.create({
                message: `Selezionare una durata compresa tra ${min} e ${max} secondi. Altri valori non saranno salvati.`,
                duration: 500
            });
            await toast.present();
        }
    }
}

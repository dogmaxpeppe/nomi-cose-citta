import { Component } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { ToastController } from '@ionic/angular';
import { Settings, ThemeTypes } from '../../components/settings/settings';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

    public themeLabels = [
        {key: 'auto', value: '(Auto) Sistema'},
        {key: 'light', value: 'Chiaro'},
        {key: 'dark', value: 'Scuro'},
    ];

    public loadedSettings: Settings;

    constructor(
        public settings: SettingsService,
        private toastController: ToastController,
    ) {
        const getAllProps = async () => {
            this.loadedSettings = await this.settings.getAllSettings();
        };

        getAllProps().then(() => console.log(this.loadedSettings));
    }

    changeProp(ev: any) {
        // Intercept Prop ID
        const evID = ev.target.id;

        // Exec Function based on ID
        switch (evID) {
            case 'themeSelector':
                this.themeSelector(ev.detail.value);
                break;
            case 'countdownSeconds':
                this.countdownSeconds(+ev.detail.value, ev.target.min, ev.target.max);
                break;
            case 'toggleSound':
                this.toggleSound(ev.detail.checked);
                break;
        }
    }

    private themeSelector(value: ThemeTypes) {
        this.settings.setTheme(value);
    }

    private async countdownSeconds(seconds: number, min: number, max: number) {
        if (seconds >= min && seconds <= max) {
            this.settings.setCountdown(seconds);
        } else {
            const toast = await this.toastController.create({
                message: `Selezionare una durata compresa tra ${min} e ${max} secondi. Altri valori non saranno salvati.`,
                duration: 5000
            });
            await toast.present();
        }
    }

    private toggleSound(value: boolean) {
        this.settings.toggleSound(value);
    }
}

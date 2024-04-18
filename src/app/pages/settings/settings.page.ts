import { Component, OnDestroy } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { ToastController } from '@ionic/angular';
import { Settings, ThemeTypes } from '../../components/settings/settings';
import { TranslateService } from "@ngx-translate/core";
import { TranslateConfigService } from "../../services/translate.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnDestroy{

    public themeLabels: { key: string, value: string }[] = [];
    public languages: { key: string; value: string; flag: string }[];
    // Subscription Cambio lingua
    private changeLanguageSubscription: Subscription;

    public loadedSettings: Settings;

    constructor(
        public settings: SettingsService,
        private toastController: ToastController,
        private trans: TranslateService,
        private transConfig: TranslateConfigService,
    ) {
        this.setupTranslations();

        this.changeLanguageSubscription = this.trans.onLangChange.subscribe(async () => {
            this.setupTranslations();
        });
        if (this.settings.getCurrentLanguage()) {
            this.trans.use(this.settings.getCurrentLanguage());
        }

        const getAllProps = async () => {
            this.loadedSettings = await this.settings.getAllSettings();
        };

        getAllProps().then(() => console.log(this.loadedSettings));
    }

    private setupTranslations() {
        this.themeLabels = [
            { key: 'auto', value: this.trans.instant('OPTIONS_SUBMENU.THEMES.AUTO') },
            { key: 'light', value: this.trans.instant('OPTIONS_SUBMENU.THEMES.LIGHT') },
            { key: 'dark', value: this.trans.instant('OPTIONS_SUBMENU.THEMES.DARK') },
        ];

        this.languages = [
            { key: 'it', value: this.trans.instant('OPTIONS_SUBMENU.LANGUAGES.ITALIAN'), flag: '🇮🇹' },
            { key: 'en', value: this.trans.instant('OPTIONS_SUBMENU.LANGUAGES.ENGLISH'), flag: '🇬🇧' },
        ];
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
            case 'languageSelector':
                this.transConfig.setLanguage(ev.detail.value);
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

    ngOnDestroy(): void {
        this.changeLanguageSubscription.unsubscribe();
    }
}

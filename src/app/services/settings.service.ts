import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { environment } from '../../environments/environment';
import { Settings, ThemeTypes } from '../components/settings/settings';
import { ThemeDetectionOriginal } from "@awesome-cordova-plugins/theme-detection";
import { ThemeDetection } from "@awesome-cordova-plugins/theme-detection/ngx";

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private _storage: Storage | null = null;

    constructor(
        private storage: Storage,
    ) {
        this.init();
    }

    async init() {
        // If using, define drivers here: await this.storage.defineDriver(/*...*/);
        this._storage = await this.storage.create();

        // Add Settings Params in storage, if they doesn't exists
        const settings = environment.settings;
        for (const key in settings) {
            if (await this.get(key) === null) {
                await this.set(key, settings[key]);
            }
        }

        // Set Theme
        const themeSetting: ThemeTypes = await this.getTheme();
        if (themeSetting === 'auto') {
            await this.detectThemeMode();
        } else {
            this.setTheme(themeSetting);
        }
    }

    public async getAllSettings(): Promise<Settings> {
        return {
            theme: await this.getTheme(),
            countdown: await this.getCountdown(),
            sound: await this.getSoundStatus(),
        };
    }

    public async getTheme(): Promise<ThemeTypes> {
        return await this.get('theme');
    }

    public async getCountdown(): Promise<number> {
        return await this.get('countdown');
    }

    public async getSoundStatus() {
        return await this.get('sound');
    }

    public setTheme(value: ThemeTypes) {
        this.set('theme', value).then(() => {
            if (value !== 'auto') {
                this.toggleDarkMode(value === 'dark');
            } else {
                this.detectThemeMode();
            }
        });
    }

    public setCountdown(value: number) {
        this.set('countdown', value);
    }

    public toggleSound(value: boolean) {
        this.set('sound', value);
    }

    // Create and expose methods that users of this service can
    // call, for example:
    private get(key: string): Promise<any> {
        return this._storage?.get(key);
    }

    private set(key: string, value: any) {
        return this._storage?.set(key, value).then(value => {
            console.log('SAVED SETTING =>', key, value);
        });
    }

    public async getAll(): Promise<any> {
        const data: Array<any> = [];

        const keys = await this._storage?.keys();

        for (const key of keys) {
            data[key] = await this.get(key);
        }

        return data;
    }

    /**
     * Toggles Dark Mode, activating it if checked is true, otherwise disabling it
     *
     * @param checked
     * @private
     */
    public toggleDarkMode(checked: boolean): void {
        document.body.classList.toggle('dark', checked);
    }

    public async detectThemeMode() {
        try {
            const themeDetectionIsAvailable = await ThemeDetection.isAvailable();
            if (themeDetectionIsAvailable.value) {
                const darkModeIsEnable = await ThemeDetection.isDarkModeEnabled();

                // Abilita, eventualmente, la Dark Mode
                this.toggleDarkMode(darkModeIsEnable.value);
            }
        } catch (e) {
            console.error(e);
        }
    }
}

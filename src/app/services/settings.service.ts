import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { environment, settingsLabels } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private _storage: Storage | null = null;
    public readonly DARK_THEME_ENABLED = settingsLabels.DARK_THEME_ENABLED;
    public readonly COUNTDOWN_SECONDS = settingsLabels.COUNTDOWN_SECONDS;

    constructor(private storage: Storage) {
        this.init();
    }

    async init() {
        // If using, define drivers here: await this.storage.defineDriver(/*...*/);
        this._storage = await this.storage.create();

        // Add Settings Params in storage, if they doesn't exists
        const settings = environment.settings;
        for (const key in settings) {
            if (!await this.get(key)) {
                await this.set(key, settings[key]);
            }
        }
    }

    // Create and expose methods that users of this service can
    // call, for example:
    public set(key: string, value: any) {
        this._storage?.set(key, value).then(value => {
            console.log('SAVED SETTING =>', key, value);

            // Se la chiave riguarda la toggleDarkMode, abilita o disabilita il toggle
            if (key === this.DARK_THEME_ENABLED) {
                SettingsService.toggleDarkMode(value);
            }
        });
    }

    public get(key: string) {
        return this._storage?.get(key);
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
    private static toggleDarkMode(checked: boolean): void {
        document.body.classList.toggle('dark', checked);
    }
}

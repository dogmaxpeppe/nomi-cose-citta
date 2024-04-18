import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { environment } from '../../environments/environment';
import { Settings, ThemeTypes } from '../components/settings/settings';
import { ThemeDetection } from "@awesome-cordova-plugins/theme-detection/ngx";
import { Game } from "../state/state";
import { Platform } from "@ionic/angular";
import { select, Store } from "@ngrx/store";
import { getCurrentGame } from "../state/selectors";
import { TranslateConfigService } from "./translate.service";

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private _storage: Storage | null = null;
    private readonly MATCHES_KEY = 'matches';
    private readonly THEME_KEY = 'theme';
    private readonly COUNTDOWN_KEY = 'countdown';
    private readonly SOUND_KEY = 'sound';

    constructor(
        private storage: Storage,
        private platform: Platform,
        private appStore: Store,
        private themeDetection: ThemeDetection,
        private translateConfig: TranslateConfigService,
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

        this.platform.pause.subscribe(async () => {
            // Save current game
            const currentGame = await this.getCurrentGame();
            if (currentGame) {
                await this.setMatchInfo(currentGame);
            }
        });

        // Set language
        if (!this.getCurrentLanguage()) {
            this.translateConfig.setLanguage(this.translateConfig.getDefaultLanguage());
        }
    }

    public async getAllSettings(): Promise<Settings> {
        return {
            theme: await this.getTheme(),
            countdown: await this.getCountdown(),
            sound: await this.getSoundStatus(),
            language: this.getCurrentLanguage(),
        };
    }

    public async getTheme(): Promise<ThemeTypes> {
        return await this.get(this.THEME_KEY);
    }

    public async getCountdown(): Promise<number> {
        return await this.get(this.COUNTDOWN_KEY);
    }

    public async getSoundStatus() {
        return await this.get(this.SOUND_KEY);
    }

    public getCurrentLanguage() {
        return this.translateConfig.getCurrentLang();
    }

    public async getMatchesInfo(): Promise<Game[]> {
        return await this.get(this.MATCHES_KEY);
    }

    private async getCurrentGame(): Promise<Game> {
        const games = await this.getMatchesInfo();
        if (games && games.length > 0) {
            return games.find(game => game.currentGame);
        }

        return null;
    }

    public setTheme(value: ThemeTypes) {
        this.set(this.THEME_KEY, value).then(() => {
            if (value !== 'auto') {
                this.toggleDarkMode(value === 'dark');
            } else {
                this.detectThemeMode();
            }
        });
    }

    public setCountdown(value: number) {
        this.set(this.COUNTDOWN_KEY, value);
    }

    public toggleSound(value: boolean) {
        this.set(this.SOUND_KEY, value);
    }

    public saveCurrentGame() {
        console.log("SAVING CURRENT GAME");
        this.appStore.pipe(select(getCurrentGame)).subscribe((game: Game) => {
            this.setMatchInfo(game);
        });
    }

    public deleteCurrentGame() {
        console.log("DESTROY CURRENT GAME")
        this.appStore.pipe(select(getCurrentGame)).subscribe(async (game: Game) => {
            const matches: Game[] = await this.getMatchesInfo();
            this.set(this.MATCHES_KEY, matches.filter(m => m.id !== game.id));
        });
    }

    public async setMatchInfo(newGame: Game) {
        console.log("SAVE GAME", newGame);
        // Se il match ha lo stesso ID, sovrascrivi il precedente. Altrimenti, aggiungi
        let matches: Game[] = await this.getMatchesInfo();

        if (!matches) {
            matches = [];
        }

        let newMatches: Game[] = [];

        const matchFound = matches.find(m => m.id === newGame.id);
        if (matchFound) {
            newMatches = matches.filter(m => m.id !== newGame.id);
        }

        newMatches.push(newGame);

        // Ordina per ID
        await this.set(this.MATCHES_KEY, newMatches.sort((a: Game, b: Game) => a.id - b.id));
    }
    // Create and expose methods that users of this service can
    // call, for example:

    private get(key: string): Promise<any> {
        return this._storage?.get(key);
    }

    private async set(key: string, value: any) {
        let value1 = await this._storage?.set(key, value);
        console.log('SAVED SETTING =>', key, value1);
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
            const themeDetectionIsAvailable = await this.themeDetection.isAvailable();
            if (themeDetectionIsAvailable.value) {
                const darkModeIsEnable = await this.themeDetection.isDarkModeEnabled();

                // Abilita, eventualmente, la Dark Mode
                this.toggleDarkMode(darkModeIsEnable.value);
            }
        } catch (e) {
            console.error(e);
        }
    }
}

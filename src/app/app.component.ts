import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { StatusBar } from "@awesome-cordova-plugins/status-bar";
import { SettingsService } from './services/settings.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    // noinspection JSUnusedLocalSymbols
    constructor(
        private platform: Platform,
        private settings: SettingsService   // Inizializzato qui per "runnare" le settings
    ) {
        this.initializeApp();
    }

    initializeApp() {
        // Init Platform
        this.platform.ready().then(async () => {
            StatusBar.styleDefault()
        });
    }
}

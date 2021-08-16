import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
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
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private settings: SettingsService   // Inizializzato qui per "runnare" le settings
    ) {
        this.initializeApp();
    }

    initializeApp() {
        // Init Platform
        this.platform.ready().then(async () => {
            this.statusBar.styleDefault();
        });
    }
}

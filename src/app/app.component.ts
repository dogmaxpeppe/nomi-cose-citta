import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { SharedService } from './services/shared.service';
import { SettingsService } from './services/settings.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private router: Router,
        private settings: SettingsService,
        private shared: SharedService
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

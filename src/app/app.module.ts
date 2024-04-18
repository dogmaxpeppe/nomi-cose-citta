import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedService } from './services/shared.service';
import { ReactiveFormsModule } from '@angular/forms';

// Audio
import { SmartAudio } from './services/smart-audio.service';

// Redux
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/reducer';

// Storage
import { Drivers, Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';
import { SettingsService } from './services/settings.service';
import { ThemeDetection } from "@awesome-cordova-plugins/theme-detection/ngx";
import { Insomnia } from "@awesome-cordova-plugins/insomnia/ngx";

// Multilanguage
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateConfigService } from "./services/translate.service";

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot({ reducer }),
        IonicStorageModule.forRoot({
            name: '__mydb',
            driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
        }),
        HttpClientModule,
        TranslateModule.forRoot({
            defaultLanguage: 'it',
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        SharedService,
        SmartAudio,
        SettingsService,
        ThemeDetection,
        Insomnia,
        TranslateConfigService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

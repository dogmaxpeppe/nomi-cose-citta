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
import { IonicStorageModule } from '@ionic/storage-angular';
import { SettingsService } from './services/settings.service';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot({ reducer }),
        IonicStorageModule.forRoot(),
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        SharedService,
        SmartAudio,
        SettingsService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedService } from './services/shared.service';
import { ReactiveFormsModule } from '@angular/forms';

import { SmartAudio } from './services/smart-audio.service'
import { NativeAudio } from '@ionic-native/native-audio/ngx';

// REDUX
import { StoreModule } from '@ngrx/store';
import reducer from '../reducer';
import { Actions } from '../actions';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot({'reducer': reducer}),
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        SharedService,
        SmartAudio,
        NativeAudio,
        Actions
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

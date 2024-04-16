import { Injectable } from '@angular/core';
import { NativeAudio } from "@awesome-cordova-plugins/native-audio";
import { Platform } from '@ionic/angular';
import { SettingsService } from './settings.service';

@Injectable({
    providedIn: 'root'
})
export class SmartAudio {

    audioType: string = 'html5';
    sounds: any = [];

    constructor(
        private platform: Platform,
        private settings: SettingsService
    ) {

        if (platform.is('cordova')) {
            this.audioType = 'native';
        }

    }

    public preload(key, asset) {

        if (this.audioType === 'html5') {
            let audio = {
                key: key,
                asset: asset,
                type: 'html5'
            };

            this.sounds.push(audio);
        } else {
            NativeAudio.preloadSimple(key, asset);

            let audio = {
                key: key,
                asset: key,
                type: 'native'
            };

            this.sounds.push(audio);
        }
    }

    public async play(key) {
        if (await this.settings.getSoundStatus()) {
            let audio = this.sounds.find((sound) => {
                return sound.key === key;
            });

            if (audio.type === 'html5') {
                let audioAsset = new Audio(audio.asset);
                audioAsset.play();
            } else {
                NativeAudio.play(audio.asset).then((res) => {
                    console.log(res);
                }, (err) => {
                    console.log(err);
                });
            }
        }
    }
}

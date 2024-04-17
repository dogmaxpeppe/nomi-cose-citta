import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { SmartAudio } from '../../services/smart-audio.service';
import { Router } from '@angular/router';

import { select, Store } from '@ngrx/store';
import { updateLetters } from '../../state/actions';

import { selectLetters } from '../../state/selectors';
import { SettingsService } from '../../services/settings.service';

import { CountdownComponent, CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { Insomnia } from "@awesome-cordova-plugins/insomnia/ngx";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: 'app-letter-extractor',
    templateUrl: './letter-extractor.component.html',
    styleUrls: ['./letter-extractor.component.scss'],
})
export class LetterExtractorComponent implements OnInit, OnDestroy {

    // TODO: se la lingua è inglese, metti anche le altre lettere
    private listLetters = 'ABCDEFGHILMNOPQRSTUVZ';
    public letters = [];
    public currentLetter = null;
    public timerStarted: boolean;
    public timerPaused: boolean;

    public countdownConfig: CountdownConfig;
    @ViewChild('cd', {static: false}) public countdown: CountdownComponent;
    @ViewChild('timerNumber', {static: false}) timerNumber: ElementRef;
    @ViewChild('timerStarted', {static: false}) timerEl: ElementRef;
    public lastMinute = false;
    public lastTenSeconds = false;

    constructor(
        private alertController: AlertController,
        private router: Router,
        private smartAudio: SmartAudio,
        private appStore: Store,
        private settings: SettingsService,
        private insomnia: Insomnia,
        private platform: Platform,
        private trans: TranslateService,
    ) {
        this.appStore.pipe(select(selectLetters)).subscribe(letters => {
            this.listLetters = letters;
            this.letters = this.listLetters.split('');
        });

        this.smartAudio.preload('lastminute', 'assets/audio/lastminute.mp3');
        this.smartAudio.preload('lastsecond', 'assets/audio/lastsecond.mp3');
        this.smartAudio.preload('timeout', 'assets/audio/timeout.mp3');
        this.smartAudio.preload('countdown-beep', 'assets/audio/countdown-beep.mp3');
        this.smartAudio.preload('start', 'assets/audio/start.mp3');
    }

    async ngOnInit() {
        const leftTime = await this.settings.getCountdown();

        this.countdownConfig = {
            demand: true,
            leftTime,
            format: 'mm:ss',
            notify: 0
        };
    }

    // noinspection JSUnusedGlobalSymbols
    ionViewWillLeave() {
        this.timerStarted = false;
        this.currentLetter = null;
        this.lastMinute = false;
        this.lastTenSeconds = false;
    }

    extractLetter(selectedLetterIndex: number = null) {
        // Se selezioni la lettera, usa quella. Altrimenti, prendila Random
        const indexLetter = selectedLetterIndex === null
            ? Math.floor((Math.random() * this.letters.length))
            : selectedLetterIndex;
        this.currentLetter = this.letters[indexLetter];

        setTimeout(async () => {
            const confirmHandler = () => {
                this.startRound(indexLetter);
            };

            const alert = await this.alertController.create({
                header: this.trans.instant('LETTER_X', {letter: this.currentLetter}),
                message: this.trans.instant('LETTER_X_EXTRACTED', {letter: this.currentLetter}),
                buttons: [
                    {text: this.trans.instant('YES'), handler: confirmHandler},
                    this.trans.instant('NO'),
                ]
            });

            await alert.present();
        }, 1500);
    }

    resetLetter() {
        this.currentLetter = null;
    }

    private startRound(index: number) {
        this.letters.splice(index, 1);
        this.appStore.dispatch(updateLetters({letters: this.letters.join('')}));
        this.timerStarted = true;
        this.startCountDown();
    }

    private async startCountDown() {
        this.keepAwake();
        function hideAndChange(timerNumberRef, str: string) {
            timerNumberRef.nativeElement.style.display = 'none';
            timerNumberRef.nativeElement.innerHTML = str;
        }

        function show(timerNumberRef, newClass = null) {
            timerNumberRef.nativeElement.style.display = '';
            if (newClass) {
                timerNumberRef.nativeElement.classList = newClass;
            }
        }

        // Promise per evitare il callback hell
        const wait = ms => new Promise((resolve) => setTimeout(resolve, ms));

        await this.smartAudio.play('countdown-beep');
        await wait(1000);
        hideAndChange(this.timerNumber, '2');

        await wait(50);
        await this.smartAudio.play('countdown-beep');
        show(this.timerNumber);

        await wait(950);
        hideAndChange(this.timerNumber, '1');

        await wait(50);
        await this.smartAudio.play('countdown-beep');
        show(this.timerNumber);

        await wait(950);
        hideAndChange(this.timerNumber, this.trans.instant('START'));
        await this.smartAudio.play('start');

        await wait(50);
        show(this.timerNumber, 'icon-letter-char-timer-last');

        await wait(350);
        this.timerNumber.nativeElement.parentElement.style.display = 'none';
        await this.startTimer();
    }

    private async startTimer() {
        this.timerNumber.nativeElement.style.display = 'none';

        const timer = this.timerEl.nativeElement;
        timer.style.display = '';

        this.countdown.begin();
    }

    private async endRound() {
        this.countdown.stop();
        await this.smartAudio.play('timeout');
        this.allowSleepAgain();
        await this.router.navigate(['/ranking'], {state: {setupPoints: true}});
    }

    public toggleTimer() {
        this.timerPaused = !this.timerPaused;
        if (this.timerPaused) {
            this.countdown.pause();
        } else {
            this.countdown.resume();
        }
    }

    async restartTimer() {
        const restartHandler = () => {
            this.countdown.restart();
            this.timerPaused = false;
            this.countdown.begin();
        };

        const alert = await this.alertController.create({
            header: this.trans.instant('RESET_TIMER'),
            message: this.trans.instant('RESET_TIMER_MESSAGE'),
            buttons: [
                {text: this.trans.instant('YES'), handler: restartHandler},
                this.trans.instant('NO'),
            ],
        });

        await alert.present();
    }

    async stopTimer() {
        const alert = await this.alertController.create({
            header: this.trans.instant('STOP_TIMER'),
            message: this.trans.instant('STOP_TIMER_MESSAGE'),
            buttons: [
                {text: this.trans.instant('YES'), handler: () => this.endRound()},
                this.trans.instant('NO')
            ]
        });

        await alert.present();
    }

    handleRound(ev: CountdownEvent) {
        // Esegui i suoni solo se il timer è avviato
        if (ev.left > 60000) {
            this.lastMinute = false;
            this.lastTenSeconds = false;
        }

        if (ev.left <= 60000 && ev.left > 10000) {
            if (ev.status === 0 && !this.lastMinute) {
                this.smartAudio.play('lastminute');
            }
            this.lastMinute = true;
            this.lastTenSeconds = false;
        }

        if (ev.left <= 10000) {
            if (ev.left >= 1000) {
                this.smartAudio.play('lastsecond');
            }
            this.lastMinute = false;
            this.lastTenSeconds = true;
        }
    }

    handleCountdownEvent(ev: CountdownEvent) {
        switch (ev.action) {
            // Ogni secondo, esegue dei controlli
            case 'restart':
            case 'notify': {
                this.handleRound(ev);
                break;
            }
            case 'done': {
                this.endRound();
            }
        }
    }

    private keepAwake() {
        if (this.platform.is('cordova')) {
            this.insomnia.keepAwake();
        }
    }

    private allowSleepAgain() {
        if (this.platform.is('cordova')) {
            this.insomnia.allowSleepAgain();
        }
    }

    ngOnDestroy(): void {
        // Per sicurezza, togli il keepAwake anche all'ngOnDestroy
        this.allowSleepAgain();
    }
}

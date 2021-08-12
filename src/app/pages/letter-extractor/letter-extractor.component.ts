import { Component, ElementRef, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { SmartAudio } from '../../services/smart-audio.service';
import { Router } from '@angular/router';

import { select, Store } from '@ngrx/store';
import { updateLetters } from '../../state/actions';

import { selectLetters } from '../../state/selectors';

@Component({
    selector: 'app-letter-extractor',
    templateUrl: './letter-extractor.component.html',
    styleUrls: ['./letter-extractor.component.scss'],
})
export class LetterExtractorComponent {

    private listLetters = 'ABCDEFGHILMNOPQRSTUVZ';
    public letters = [];
    public currentLetter = null;
    public timerActive = false;
    public timerStr: string = null;
    @ViewChild('timerNumber', {static: false}) timerNumber: ElementRef;
    @ViewChild('timerStarted', {static: false}) timerEl: ElementRef;

    constructor(
        private alertController: AlertController,
        private router: Router,
        private smartAudio: SmartAudio,
        private appStore: Store
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

    extractLetter() {
        const indexLetter = Math.floor((Math.random() * this.letters.length));
        this.currentLetter = this.letters[indexLetter];

        setTimeout(() => {
            this.presentAlert(this.currentLetter, () => {
                this.startRound(indexLetter);
            });
        }, 1500);
    }

    ionViewWillEnter() {
        this.timerActive = false;
        this.timerStr = null;
        this.currentLetter = null;
    }

    private startRound(index) {
        this.letters.splice(index, 1);
        this.appStore.dispatch(updateLetters({letters: this.letters.join('')}));
        this.timerActive = true;
        this.startCountDown();
    }

    private startCountDown() {
        function hideAndChange(timerNumberRef, str: string) {
            timerNumberRef.nativeElement.style.display = 'none';
            timerNumberRef.nativeElement.innerHTML = str;
        }

        function show(timerNumberRef, newClass = null) {
            timerNumberRef.nativeElement.style.display = '';
            if ( newClass ) {
                timerNumberRef.nativeElement.classList = newClass;
            }
        }

        this.smartAudio.play('countdown-beep');
        setTimeout(() => {
            hideAndChange(this.timerNumber, '2');
            setTimeout(() => {
                this.smartAudio.play('countdown-beep');
                show(this.timerNumber);
                setTimeout(() => {
                    hideAndChange(this.timerNumber, '1');
                    setTimeout(() => {
                        this.smartAudio.play('countdown-beep');
                        show(this.timerNumber);
                        setTimeout(() => {
                            hideAndChange(this.timerNumber, 'VIA!');
                            this.smartAudio.play('start');
                            setTimeout(() => {
                                show(this.timerNumber, 'icon-letter-char-timer-last');
                                setTimeout(() => {
                                    this.timerNumber.nativeElement.parentElement.style.display = 'none';
                                    this.startTimer();
                                }, 350);
                            }, 50);
                        }, 950);
                    }, 50);
                }, 950);
            }, 50);
        }, 1000);
    }

    private startTimer() {
        function remainingTime(time) {
            const t = Date.parse(time) - Date.parse(new Date().toString());
            const sec = Math.floor((t / 1000) % 60);
            const min = Math.floor((t / 1000 / 60) % 60);
            return {
                total: t,
                minutes: min,
                seconds: sec < 10 ? '0' + sec : sec
            };
        }

        this.timerNumber.nativeElement.style.display = 'none';
        const endTime = new Date();
        endTime.setSeconds(endTime.getSeconds() + 1);
        const timer = this.timerEl.nativeElement;
        timer.style.display = '';
        const timeInterval = setInterval(() => {
            const t = remainingTime(endTime);

            if (t.total <= 10000) {
                if (t.total > 0) {
                    this.smartAudio.play('lastsecond');
                }

                if (!timer.classList.contains('timer-last-ten-seconds')) {
                    timer.classList.add('timer-last-ten-seconds');
                }
            } else if (t.total <= 60000 && !timer.classList.contains('timer-less-minute')) {
                this.smartAudio.play('lastminute');
                timer.classList.add('timer-less-minute');
            }

            this.timerStr = `${t.minutes}:${t.seconds}`;

            if ( t.total <= 0 ) {
                this.smartAudio.play('timeout');
                clearInterval(timeInterval);
                setTimeout(() => {this.router.navigate(['/ranking'], {state: {setupPoints: true}});})
            }
        }, 1000);
    }

    async presentAlert(letter: string, confirmHandler) {
        const alert = await this.alertController.create({
            header: `Lettera ${letter}`,
            message: `È stata pescata la lettera ${letter}. Giocare con questa lettera?`,
            buttons: [{text: 'Sì', handler: confirmHandler}, 'No']
        });

        await alert.present();
    }

}

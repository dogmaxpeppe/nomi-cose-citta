import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Platform, ToastController } from '@ionic/angular';

@Injectable()
export class SharedService {
    // Observable string sources
    private emitAddPlayer = new Subject<any>();
    private emitEditPlayer = new Subject<any>();
    private emitUpdatePoints = new Subject<any>();
    // Observable string streams
    addPlayer$ = this.emitAddPlayer.asObservable();
    editPlayer$ = this.emitEditPlayer.asObservable();
    updatePoints$ = this.emitUpdatePoints.asObservable();

    constructor(private platform: Platform, private toastController: ToastController) {
    }

    async enableBackButton() {
        this.platform.backButton.observers.pop();

        // const toast = await this.toastController.create({
        //     message: "Back Button abilitato",
        //     duration: 2000,
        // });
        //
        // await toast.present();
    }

    disableBackButton() {
        this.platform.backButton.subscribeWithPriority(1, async () => {
            // const toast = await this.toastController.create({
            //     message: "Back Button disabilitato",
            //     duration: 2000,
            // });
            //
            // await toast.present();
        });
    }

    // Service message commands
    emitAddPlayerFun(change: any) {
        console.log('EMIT ADD PLAYER FUN', change);
        this.emitAddPlayer.next(change);
    }

    emitEditPlayerFun(change: any) {
        console.log('EMIT EDIT PLAYER FUN', change);
        this.emitEditPlayer.next(change);
    }

    emitUpdatePointsFun(change: any) {
        console.log('EMIT UPDATE POINTS FUN', change);
        this.emitUpdatePoints.next(change);
    }
}

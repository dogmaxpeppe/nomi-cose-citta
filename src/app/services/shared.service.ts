import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

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

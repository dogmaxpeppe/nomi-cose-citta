import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class SharedService {
    // Observable string sources
    private emitAddPlayer = new Subject<any>();
    private emitUpdatePoints = new Subject<any>();
    // Observable string streams
    addPlayer$ = this.emitAddPlayer.asObservable();
    updatePoints$ = this.emitUpdatePoints.asObservable();

    // Service message commands
    emitAddPlayerFun(change: any) {
        console.log(change);
        this.emitAddPlayer.next(change);
    }

    emitUpdatePointsFun(change: any) {
        console.log("EmitPoints");
        console.log(change);
        this.emitUpdatePoints.next(change);
    }
}

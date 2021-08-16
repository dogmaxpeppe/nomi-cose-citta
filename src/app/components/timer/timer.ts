import * as moment from 'moment';
import { Moment } from 'moment/moment';

export class Timer {
    public total: number;
    private endTime: Moment;

    public printTimer(): string {
        const minutes = Math.floor((this.total / 1000 / 60) % 60);
        const seconds = Math.floor((this.total / 1000) % 60);
        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }

    public setTimer(time: Moment = null): void {
        this.total = (+time) - (+moment());
    }
}

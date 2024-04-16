import { Player } from '../components/player/player';

export interface Game {
    id: number,
    players: Player[],
    letters: string,
    currentGame: boolean,
    date?: Date,
}

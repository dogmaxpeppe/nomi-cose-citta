import { createSelector } from '@ngrx/store';
import { Player } from '../components/player/player';

export const selectLetters = createSelector(
    (state: any) => state.reducer.letters,
    (letters: string) => letters
);

export const selectPlayers = createSelector(
    (state: any) => state.reducer.players,
    (players: Player[]) => players
);

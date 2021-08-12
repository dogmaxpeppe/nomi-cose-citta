export const ADD_PLAYER = 'ADD_PLAYER';
export const UPDATE_LETTERS = 'UPDATE_LETTERS';
export const UPDATE_POINTS = 'UPDATE_POINTS';
export const NEW_GAME = 'NEW_GAME';
import { createAction, props } from '@ngrx/store';
import { Player } from '../components/player/player';

export const addPlayer = createAction(
    ADD_PLAYER,
    props<{ player: Player }>()
);

export const updateLetters = createAction(
    UPDATE_LETTERS,
    props<{ letters: string }>()
);

export const updatePoints = createAction(
    UPDATE_POINTS,
    props<{ points: number[] }>()
);

export const newGame = createAction(
    NEW_GAME,
);

import { createReducer, on } from '@ngrx/store';
import { addPlayer, newGame, updateLetters, updatePoints } from './actions';
import { Player } from '../components/player/player';

const initialPlayer: Player = {
    id: 1,
    name: 'Player1',
    avatar: 1,
    points: null,
};

export const initialState = {
    players: [initialPlayer],
    letters: 'ABCDEFGHILMNOPQRSTUVZ',
};

export const reducer = createReducer(
    initialState,
    on(addPlayer, (state, {player}) => {
        const newPlayer = {...player};
        newPlayer.id = state.players[state.players.length - 1].id + 1;

        return {
            ...state,
            players: state.players.concat(newPlayer)
        };
    }),
    on(updateLetters, (state, {letters}) => {
        return {...state, letters};
    }),
    on(updatePoints, (state, {points}) => {
        const playersUpdated = JSON.parse(JSON.stringify(state.players));
        playersUpdated.map((player) => {
            player.points += points['player-' + player.id];
            return player;
        });

        const newState = {
            ...state,
            players: playersUpdated
        };

        console.log(newState);

        return newState;
    }),
    on(newGame, () => initialState)
);

export default reducer;

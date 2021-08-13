import { createReducer, on } from '@ngrx/store';
import { addPlayer, deletePlayer, newGame, updateLetters, updatePoints } from './actions';
import { Player } from '../components/player/player';

// TODO: nei settings puoi pensare di mettere una blacklist di lettere
const initialLetters: string = 'ABCDEFGHILMNOPQRSTUVZ';
const initialPlayers: Player[] = [
    {id:1, name: "Pippo", avatar:1, points: 10},
    {id:2, name: "Paperino", avatar:2, points: 5},
    {id:3, name: "Gastone", avatar:3, points: 60},
    {id:4, name: "Topolino", avatar:4, points: 30},
    {id:5, name: "Paperone", avatar:5, points: 50},
];
// const initialPlayers: Player[] = [];

export const initialState = {
    players: initialPlayers,
    letters: initialLetters,
};

export const reducer = createReducer(
    initialState,
    on(addPlayer, (state, {player}) => {
        const newPlayer = {...player};
        let newPlayerList;

        // Se l'ID è definito, sovrascrivi il player con l'ID selezionato,
        // Altrimenti crea l'ID prendendo la lunghezza della lista dei player, incrementando di uno (se la lista esiste, altrimenti, fissa 1)
        if (!newPlayer.id) {
            newPlayer.id = state.players.length ? state.players[state.players.length - 1].id + 1 : 1;
            newPlayerList = state.players.concat(newPlayer);
        } else {
            // Restituisci una nuova lista SENZA il player da aggiornare, aggiungendo poi il giocatore aggiornato
            newPlayerList = state.players.filter(x => x.id !== newPlayer.id).concat(newPlayer);
        }

        return {
            ...state,
            players: newPlayerList
        };
    }),
    on(deletePlayer, (state, {player}) => {
        return {
            ...state,
            players: state.players.filter(x => x.id !== player.id)
        }
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

        return {
            ...state,
            players: playersUpdated
        };
    }),
    on(newGame, (state) => {
        // Ai giocatori correnti vengono azzerati i punteggi
        // Mentre lo stato delle lettere è quello iniziale
        return {
            ...state,
            players: state.players.map((player: Player) => {
                const updatedPlayer = {...player};
                updatedPlayer.points = null;
                return updatedPlayer;
            }),
            letters: initialLetters
        }
    })
);

export default reducer;

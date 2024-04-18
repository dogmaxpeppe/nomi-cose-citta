import { createReducer, on } from '@ngrx/store';
import { addPlayer, deletePlayer, newGame, updateLetters, updatePoints } from './actions';
import { Player } from '../components/player/player';
import { Game } from "./state";

const initialLetters: string = localStorage.getItem('lang')?.includes('it')
    ? 'ABCDEFGHILMNOPQRSTUVZ'
    : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
// const initialPlayers: Player[] = [];
const initialPlayers: Player[] = [{
    id: 1,
    name: 'Player 1',
    avatar: 1,
    points: null
},{
    id: 2,
    name: 'Player 2',
    avatar: 2,
    points: null
},{
    id: 3,
    name: 'Player 3',
    avatar: 3,
    points: null
},{
    id: 4,
    name: 'Player 4',
    avatar: 4,
    points: null
},];

export const initialState: Game = {
    id: 1,
    players: initialPlayers,
    letters: initialLetters,
    currentGame: true,
};

export const reducer = createReducer(
    initialState,
    on(addPlayer, (state, {player}) => {
        const newPlayer = {...player};
        let newPlayerList: Player[];

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
        playersUpdated.map((player: Player) => {
            player.points += points['player-' + player.id];
            return player;
        });

        return {
            ...state,
            players: playersUpdated
        };
    }),
    on(newGame, (state: Game, {resumedGame = null}) => {
        // Ai giocatori correnti vengono azzerati i punteggi
        // Mentre lo stato delle lettere è quello iniziale
        if (!resumedGame) {
            return {
                id: 1,
                ...state,
                players: state.players.map((player: Player) => {
                    const updatedPlayer = {...player};
                    updatedPlayer.points = null;
                    return updatedPlayer;
                }),
                letters: initialLetters,
                currentGame: true,
            }
        } else {
           return {
               id: resumedGame.id,
               players: resumedGame.players,
               letters: resumedGame.letters,
               currentGame: resumedGame.currentGame,
           }
        }
    })
);

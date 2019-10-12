import * as actions from './actions';

export interface AppState {
    players: [],
}

const initialState = {
    players: [{
        id: 1,
        name: "Dummy1",
        avatar: 1,
        points: null,
    }],
    letters: "ABCDEFGHILMNOPQRSTUVZ",
};

const reducer = (state = initialState, action) => {
    console.log('ACTION: ' + action.type);
    switch ( action.type ) {
        case actions.ADD_PLAYER:
            const newPlayer = action.newPlayer;
            newPlayer.id = state.players[state.players.length - 1].id + 1;

            return {
                ...state,
                players: state.players.concat(newPlayer)
            };
        case actions.UPDATE_LETTERS:
            return {
                ...state,
                letters: action.letters,
            };
        case actions.UPDATE_POINTS:
            const playersUpdated = JSON.parse(JSON.stringify(state.players));
            playersUpdated.map((player) => {
                player.points = action.points["player-" + player.id];
                return player;
            });

            const newState = {
                ...state,
                players: playersUpdated
            };
            console.log(newState);

            return newState;
        case actions.NEW_GAME:
            return initialState;
        default:
            return state;
    }
};

export default reducer;

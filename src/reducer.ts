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
        case actions.NEW_GAME:
            return initialState;
        default:
            return state;
    }
};

export default reducer;

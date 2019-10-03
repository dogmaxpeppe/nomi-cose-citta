export const ADD_PLAYER = 'ADD_PLAYER';
export const UPDATE_LETTERS = 'UPDATE_LETTERS';
export const NEW_GAME = 'NEW_GAME';

export class Actions {
    addPlayer(player: Player)
    {
        return {
            type: ADD_PLAYER,
            newPlayer: player,
        }
    }

    updateLetters(letters)
    {
        return {
            type: UPDATE_LETTERS,
            letters: letters
        }
    }

    newGame()
    {
        return {
            type: NEW_GAME,
        }
    }
}

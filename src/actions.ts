export const ADD_PLAYER = 'ADD_PLAYER';
export const UPDATE_LETTERS = 'UPDATE_LETTERS';
export const UPDATE_POINTS = 'UPDATE_POINTS';
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

    updatePoints(points: any) {
        return {
            type: UPDATE_POINTS,
            points: points
        }
    }

    newGame()
    {
        return {
            type: NEW_GAME,
        }
    }
}

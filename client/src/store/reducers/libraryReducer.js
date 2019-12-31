import * as actionTypes from '../actions/actionTypes';

const initialState = {
    games: [
        { name: 'Pong', added: 0 },
        { name: 'Snake', added: 0 },
        { name: 'Tetris', added: 2 },
        { name: 'Pac-Man', added: 2 },
    ],
    loading: true,
    error: false,
    errorMessage: '',
    redirect: false,
    redirectPath: '',
    isLogedin: false,
    changes: 0
}

const libraryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOADING_HANDLER_LIBRARY:
            let newChanges = ++state.changes;
            const addedGames = localStorage.getItem('games').split(',');
            const stateGames = state.games;
            const availableGames = state.games.map(data => {
                return data.name;
            });
            for (let x = 0; x < addedGames.length; x++) {
                for (let j = 0; j < availableGames.length; j++) {
                    if (addedGames[x] === availableGames[j]) {
                        stateGames[j].added = 1;
                    }
                    if (addedGames[x] !== availableGames[j]) {
                        if (stateGames[j].added !== 2) {
                            stateGames[j].added = 0;
                        }
                    }
                }
            }
            return {
                ...state,
                games: stateGames,
                loading: false,
                changes: newChanges
            }
        case actionTypes.SUBMIT_ADD_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.SUBMIT_ADD_SUCCESS:
            const games = action.data.data.games;
            localStorage.setItem('games', games);
            const myGames = state.games;
            const currentGames = state.games.map(data => {
                return data.name;
            });
            for (let x = 0; x < games.length; x++) {
                for (let j = 0; j < currentGames.length; j++) {
                    if (games[x] === currentGames[j]) {
                        myGames[j].added = 1;
                    }
                }
            }
            return {
                ...state,
                games: myGames,
                loading: false
            }
        case actionTypes.SUBMIT_ADD_FAIL:
            if (action.data.status === 404) {
                return {
                    ...state,
                    redirect: true,
                    redirectPath: '404'
                }
            }
            if (action.data.status === 500) {
                return {
                    ...state,
                    redirect: true,
                    redirectPath: '500'
                }
            }
            return {
                ...state,
                error: true,
                errorMessage: action.data.message,
            }
        case actionTypes.ERROR_HANDLER_LIBRARY:
            return {
                ...state,
                error: false,
                errorMessage: ''
            }
        case actionTypes.SIGNOUT_HANDLER:
            localStorage.removeItem('email');
            localStorage.removeItem('userId');
            localStorage.removeItem('games');
            localStorage.removeItem('token');
            localStorage.removeItem('isLogedin');
            return {
                ...state,
                isLogedin: false,
                redirect: true,
                redirectPath: ''
            }
        default:
            return state;
    }
}

export default libraryReducer;
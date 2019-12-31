import * as actionTypes from '../actions/actionTypes';

const initialState = {
    games: [],
    loading: true,
    error: false,
    errorMessage: '',
    redirect: false,
    redirectPath: '',
    changes: 0
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOADING_HANDLER_PROFILE:
            const games = localStorage.getItem('games');
            if (games.length === 0) {
                return {
                    ...state,
                    games: [],
                    loading: false
                }
            } else {
                const localGames = games.split(',');
                return {
                    ...state,
                    games: localGames,
                    loading: false
                }
            }
        case actionTypes.SUBMIT_DELETE_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.SUBMIT_DELETE_SUCCESS:
            localStorage.setItem('games', action.data.data.games);
            const newGames = localStorage.getItem('games');
            if (newGames.length === 0) {
                return {
                    ...state,
                    games: [],
                    loading: false
                }
            } else {
                const newLocalGames = newGames.split(',');
                return {
                    ...state,
                    games: newLocalGames,
                    loading: false
                }
            }
        case actionTypes.SUBMIT_DELETE_FAIL:
            if (action.data.status === 404) {
                return {
                    ...state,
                    loading: false,
                    redirect: true,
                    redirectPath: '404'
                }
            }
            if (action.data.status === 500) {
                return {
                    ...state,
                    loading: false,
                    redirect: true,
                    redirectPath: '500'
                }
            }
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.data.message,
            }
        case actionTypes.ERROR_HANDLER_PROFILE:
            return {
                ...state,
                error: false,
                errorMessage: ''
            }
        default:
            return state;
    }
}

export default profileReducer;
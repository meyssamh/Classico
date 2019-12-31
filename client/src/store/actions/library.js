import axios from 'axios';

import * as actionTypes from './actionTypes';

export const loadingHandler = () => {
    return {
        type: actionTypes.LOADING_HANDLER_LIBRARY
    }
}

export const submitAdd = (game, userId) => {
    const token = localStorage.getItem('token');
    return dispatch => {
        dispatch(submitAddStart(game, userId, token));
        axios.post('http://localhost:8080/game/post', {
            game: game, userId: userId
        },
            {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(result => {
                dispatch(submitAddSuccess(result));
            })
            .catch(err => {
                dispatch(submitAddFail(err));
            });
    }
}

export const submitAddStart = (game, userId) => {
    return {
        type: actionTypes.SUBMIT_ADD_START,
        game: game,
        userId: userId
    }
}

export const submitAddSuccess = (data) => {
    return {
        type: actionTypes.SUBMIT_ADD_SUCCESS,
        data: data
    }
}

export const submitAddFail = (data) => {
    return {
        type: actionTypes.SUBMIT_ADD_FAIL,
        data: data
    }
}

export const errorHandler = () => {
    return {
        type: actionTypes.ERROR_HANDLER_LIBRARY
    }
}

export const signoutHandler = () => {
    return {
        type: actionTypes.SIGNOUT_HANDLER
    }
}
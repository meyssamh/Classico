import axios from 'axios';

import * as actionTypes from './actionTypes';

export const loadingHandler = () => {
    return {
        type: actionTypes.LOADING_HANDLER_PROFILE
    }
}

export const submitDelete = (game, userId) => {
    const token = localStorage.getItem('token');
    return dispatch => {
        dispatch(submitDeleteStart(game, userId, token));
        axios.delete('http://localhost:8080/game/delete', {
            data: {
                game: game, userId: userId
            },
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(result => {
                dispatch(submitDeleteSuccess(result));
            })
    .catch(err => {
        dispatch(submitDeleteFail(err));
    });
    }
}

export const submitDeleteStart = (game, id) => {
    return {
        type: actionTypes.SUBMIT_DELETE_START,
        game: game,
        id: id
    }
}

export const submitDeleteSuccess = (data) => {
    return {
        type: actionTypes.SUBMIT_DELETE_SUCCESS,
        data: data
    }
}

export const submitDeleteFail = (data) => {
    return {
        type: actionTypes.SUBMIT_DELETE_FAIL,
        data: data
    }
}

export const errorHandler = () => {
    return {
        type: actionTypes.ERROR_HANDLER_PROFILE
    }
}
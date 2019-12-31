import axios from 'axios';

import * as actionTypes from './actionTypes';

export const redirectHandler = () => {
    return {
        type: actionTypes.REDIRECT_HANDLER_RESET
    }
}

export const loadingHandler = () => {
    return {
        type: actionTypes.LOADING_HANDLER_RESET
    }
}

export const submitReset = (password, confirmPassword, passwordToken) => {
    return dispatch => {
        dispatch(submitResetStart(password, confirmPassword, passwordToken));
        axios.post('http://localhost:8080/auth/reset', {
            password: password,
            confirmPassword: confirmPassword,
            passwordToken: passwordToken
        })
            .then(result => {
                dispatch(submitResetSuccess(result));
            })
            .catch(err => {
                dispatch(submitResetFail(err));
            });
    }
}

export const submitResetStart = (password, confirmPassword, passwordToken) => {
    return {
        type: actionTypes.SUBMIT_RESET_START,
        password: password,
        confirmPassword: confirmPassword,
        passwordToken: passwordToken
    }
}

export const submitResetSuccess = (data) => {
    return {
        type: actionTypes.SUBMIT_RESET_SUCCESS,
        data: data
    }
}

export const submitResetFail = (data) => {
    return {
        type: actionTypes.SUBMIT_RESET_FAIL,
        data: data
    }
}

export const submitError = () => {
    return {
        type: actionTypes.SUBMIT_ERROR_RESET
    }
}

export const errorHandler = () => {
    return {
        type: actionTypes.ERROR_HANDLER_RESET
    }
}

export const cancelHandler = () => {
    return {
        type: actionTypes.CANCEL_HANDLER_RESET
    }
}
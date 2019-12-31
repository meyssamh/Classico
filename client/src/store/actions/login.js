import axios from 'axios';

import * as actionTypes from './actionTypes';

export const redirectHandler = () => {
    return {
        type: actionTypes.REDIRECT_HANDLER_LOGIN
    }
}

export const loadingHandler = () => {
    return {
        type: actionTypes.LOADING_HANDLER_LOGIN
    }
}

export const submitLogin = (email, password) => {
    return dispatch => {
        dispatch(submitLoginStart(email, password));
        axios.post('http://localhost:8080/auth/login', {
            email: email,
            password: password
        })
            .then(result => {
                dispatch(submitLoginSuccess(result));
            })
            .catch(err => {
                dispatch(submitLoginFail(err));
            });
    }
}

export const submitLoginStart = (email, password) => {
    return {
        type: actionTypes.SUBMIT_LOGIN_START,
        email: email,
        password: password
    }
}

export const submitLoginSuccess = data => {
    return {
        type: actionTypes.SUBMIT_LOGIN_SUCCESS,
        data: data
    }
}

export const submitLoginFail = data => {
    return {
        type: actionTypes.SUBMIT_LOGIN_FAIL,
        data: data
    }
}

export const submitError = () => {
    return {
        type: actionTypes.SUBMIT_ERROR_LOGIN
    }
}

export const errorHandler = () => {
    return {
        type: actionTypes.ERROR_HANDLER_LOGIN
    }
}

export const cancelHandler = () => {
    return {
        type: actionTypes.CANCEL_HANDLER_LOGIN
    }
}
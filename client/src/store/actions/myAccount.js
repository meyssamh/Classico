import axios from 'axios';

import * as actionTypes from './actionTypes';

export const redirectHandler = () => {
    return {
        type: actionTypes.REDIRECT_HANDLER_ACCOUNT
    }
}

export const loadingHandler = () => {
    return {
        type: actionTypes.LOADING_HANDLER_ACCOUNT
    }
}

export const submitEmail = (email) => {
    return dispatch => {
        dispatch(submitEmailStart(email));
        axios.post('http://localhost:8080/auth/account', {email: email})
        .then(result => {
            dispatch(submitEmailSuccess(result));
        })
        .catch(err => {
            dispatch(submitEmailFail(err));
        });
    }
}

export const submitEmailStart = (email) => {
    return {
        type: actionTypes.SUBMIT_EMAIL_START,
        email: email
    }
}

export const submitEmailSuccess = (data) => {
    return {
        type: actionTypes.SUBMIT_EMAIL_SUCCESS,
        data: data
    }
}

export const submitEmailFail = (data) => {
    return {
        type: actionTypes.SUBMIT_EMAIL_FAIL,
        data: data
    }
}

export const submitError = () => {
    return {
        type: actionTypes.SUBMIT_ERROR_ACCOUNT
    }
}

export const errorHandler = () => {
    return {
        type: actionTypes.ERROR_HANDLER_ACCOUNT
    }
}

export const cancelHandler = () => {
    return {
        type: actionTypes.CANCEL_HANDLER_ACCOUNT
    }
}
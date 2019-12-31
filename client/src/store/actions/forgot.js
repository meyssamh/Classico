import axios from 'axios';

import * as actionTypes from './actionTypes';

export const redirectHandler = () => {
    return {
        type: actionTypes.REDIRECT_HANDLER_FORGOT
    }
}

export const redirectInfo = () => {
    return {
        type: actionTypes.REDIRECT_INFO
    }
}

export const loadingHandler = () => {
    return {
        type: actionTypes.LOADING_HANDLER_FORGOT
    }
}

export const submitForgot = (email) => {
    return dispatch => {
        dispatch(submitForgotStart(email));
        axios.post('http://localhost:8080/auth/find', {email: email})
        .then(result => {
            dispatch(submitForgotSuccess(result));
        })
        .catch(err => {
            dispatch(submitForgotFail(err));
        });
    }
}

export const submitForgotStart = (email) => {
    return {
        type: actionTypes.SUBMIT_FORGOT_START,
        email: email
    }
}

export const submitForgotSuccess = (data) => {
    return {
        type: actionTypes.SUBMIT_FORGOT_SUCCESS,
        data: data
    }
}

export const submitForgotFail = (data) => {
    return {
        type: actionTypes.SUBMIT_FORGOT_FAIL,
        data: data
    }
}

export const submitError = () => {
    return {
        type: actionTypes.SUBMIT_ERROR_FORGOT
    }
}

export const errorHandler = () => {
    return {
        type: actionTypes.ERROR_HANDLER_FORGOT
    }
}

export const cancelHandler = () => {
    return {
        type: actionTypes.CANCEL_HANDLER_FORGOT
    }
}
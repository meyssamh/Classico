import axios from 'axios';

import * as actionTypes from './actionTypes';

export const redirectHandler = () => {
    return {
        type: actionTypes.REDIRECT_HANDLER_SIGNUP
    }
}

export const loadingHandler = () => {
    return {
        type: actionTypes.LOADING_HANDLER_SIGNUP
    }
}

export const submitSignup = (email, password, confirmPassword) => {
    return dispatch => {
        dispatch(submitSignupStart(email, password, confirmPassword));
        axios.put('http://localhost:8080/auth/signup', {
            email: email, password: password,
            confirmPassword: confirmPassword
        })
            .then(result => {
                dispatch(submitSignupSuccess(result));
            })
            .catch(err => {
                dispatch(submitSignupFail(err));
            });
    }
}

export const submitSignupStart = (email, password, confirmPassword) => {
    return {
        type: actionTypes.SUBMIT_SIGNUP_START,
        email: email,
        password: password,
        confirmPassword: confirmPassword
    }
}

export const submitSignupSuccess = (data) => {
    return {
        type: actionTypes.SUBMIT_SIGNUP_SUCCESS,
        data: data
    }
}

export const submitSignupFail = (data) => {
    return {
        type: actionTypes.SUBMIT_SIGNUP_FAIL,
        data: data
    }
}

export const submitError = () => {
    return {
        type: actionTypes.SUBMIT_ERROR_SIGNUP
    }
}

export const errorHandler = () => {
    return {
        type: actionTypes.ERROR_HANDLER_SIGNUP
    }
}

export const cancelHandler = () => {
    return {
        type: actionTypes.CANCEL_HANDLER_SIGNUP
    }
}
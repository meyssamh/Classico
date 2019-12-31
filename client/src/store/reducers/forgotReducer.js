import * as actionTypes from '../actions/actionTypes';

const initialState = {
    email: '',
    loading: true,
    submit: false,
    error: false,
    errorMessage: '',
    redirect: false,
    redirectPath: ''
}

const forgotReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REDIRECT_HANDLER_FORGOT:
            return {
                ...state,
                redirect: false,
                redirectPath: ''
            }
        case actionTypes.REDIRECT_INFO:
            return {
                ...state,
                submit: true
            }
        case actionTypes.LOADING_HANDLER_FORGOT:
            return {
                ...state,
                loading: false
            }
        case actionTypes.SUBMIT_FORGOT_START:
            return {
                ...state,
                email: action.email
            }
        case actionTypes.SUBMIT_FORGOT_SUCCESS:
            return {
                ...state,
                email: action.data.data.email,
                redirect: true,
                redirectPath: ''
            }
        case actionTypes.SUBMIT_FORGOT_FAIL:
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
                submit: false
            }
        case actionTypes.SUBMIT_ERROR_FORGOT:
            return {
                ...state,
                error: true,
                errorMessage: 'Please enter a valid email!',
                submit: false
            }
        case actionTypes.ERROR_HANDLER_FORGOT:
            return {
                ...state,
                error: false,
                errorMessage: '',
                submit: false
            }
        case actionTypes.CANCEL_HANDLER_FORGOT:
            return {
                ...state,
                redirect: true
            }
        default:
            return state;
    }
}

export default forgotReducer;
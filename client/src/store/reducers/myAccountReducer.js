import * as actionTypes from '../actions/actionTypes';

const initialState = {
    email: '',
    loading: true,
    error: false,
    errorMessage: '',
    redirect: false,
    redirectPath: ''
}

const myAccountReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REDIRECT_HANDLER_ACCOUNT:
            return {
                ...state,
                redirect: false,
                redirectPath: ''
            }
        case actionTypes.LOADING_HANDLER_ACCOUNT:
            return {
                ...state,
                loading: false
            }
        case actionTypes.SUBMIT_EMAIL_START:
            return {
                ...state,
                email: action.email,
                loading: true
            }
        case actionTypes.SUBMIT_EMAIL_SUCCESS:
            if (action.data.status === 200) {
                return {
                    ...state,
                    email: action.data.data.email,
                    redirect: true,
                    redirectPath: 'login'
                }
            } else if (action.data.status === 201) {
                return {
                    ...state,
                    email: action.data.data.email,
                    redirect: true,
                    redirectPath: 'signup'
                }
            }
            return {
                ...state,
                redirect: true,
                redirectPath: '500'
            }
        case actionTypes.SUBMIT_EMAIL_FAIL:
            return {
                ...state,
                error: true,
                errorMessage: action.data.message,
                loading: false
            }
        case actionTypes.SUBMIT_ERROR_ACCOUNT:
            return {
                ...state,
                error: true,
                errorMessage: 'Please enter a valid email!',
                loading: false
            }
        case actionTypes.ERROR_HANDLER_ACCOUNT:
            return {
                ...state,
                error: false,
                errorMessage: '',
                loading: false
            }
        case actionTypes.CANCEL_HANDLER_ACCOUNT:
            return {
                ...state,
                redirect: true
            }
        default:
            return state;
    }
}

export default myAccountReducer;
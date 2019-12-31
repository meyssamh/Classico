import * as actionTypes from '../actions/actionTypes';

const initialState = {
    email: '',
    password: '',
    confirmPassword: '',
    loading: true,
    error: false,
    errorMessage: '',
    redirect: false,
    redirectPath: ''
}

const resetReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REDIRECT_HANDLER_RESET:
            return {
                ...state,
                redirect: false,
                redirectPath: ''
            }
        case actionTypes.LOADING_HANDLER_RESET:
            return {
                ...state,
                loading: false
            }
        case actionTypes.SUBMIT_RESET_START:
            return {
                ...state,
                email: action.email,
                password: action.password,
                confirmpassword: action.confirmpassword,
                loading: true
            }
        case actionTypes.SUBMIT_RESET_SUCCESS:
            return {
                ...state,
                redirect: true,
                redirectPath: ''
            }
        case actionTypes.SUBMIT_RESET_FAIL:
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
                loading: false
            }
        case actionTypes.SUBMIT_ERROR_RESET:
            return {
                ...state,
                error: true,
                errorMessage: 'Password and confirm password do not match!',
                loading: false
            }
        case actionTypes.ERROR_HANDLER_RESET:
            return {
                ...state,
                error: false,
                errorMessage: '',
                loading: false
            }
        case actionTypes.CANCEL_HANDLER_RESET:
            return {
                ...state,
                redirect: true
            }
        default:
            return state;
    }
}

export default resetReducer;
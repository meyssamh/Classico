import * as actionTypes from '../actions/actionTypes';

const initialState = {
    email: '',
    password: '',
    confirmPassword: '',
    loading: true,
    error: false,
    errorMessage: '',
    redirect: false,
    redirectPath: '',
    token: ''
}

const signupReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REDIRECT_HANDLER_SIGNUP:
            return {
                ...state,
                redirect: false,
                redirectPath: ''
            }
        case actionTypes.LOADING_HANDLER_SIGNUP:
            return {
                ...state,
                loading: false
            }
        case actionTypes.SUBMIT_SIGNUP_START:
            return {
                ...state,
                email: action.email,
                password: action.password,
                confirmpassword: action.confirmpassword,
                loading: true
            }
        case actionTypes.SUBMIT_SIGNUP_SUCCESS:
            const email = action.data.data.email;
            const userId = action.data.data.userId;
            const token = action.data.data.token;
            localStorage.setItem('email', email);
            localStorage.setItem('games', '');
            localStorage.setItem('userId', userId);
            localStorage.setItem('token', token);
            localStorage.setItem('isLogedin', true);
            return {
                ...state,
                redirect: true,
                redirectPath: 'library',
                token: token
            }
        case actionTypes.SUBMIT_SIGNUP_FAIL:
            return {
                ...state,
                error: true,
                errorMessage: '',
                loading: false
            }
        case actionTypes.SUBMIT_ERROR_SIGNUP:
            return {
                ...state,
                error: true,
                errorMessage: 'Password and confirm password do not match!',
                loading: false
            }
        case actionTypes.ERROR_HANDLER_SIGNUP:
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
        case actionTypes.CANCEL_HANDLER_SIGNUP:
            return {
                ...state,
                redirect: true
            }
        default:
            return state;
    }
}

export default signupReducer;